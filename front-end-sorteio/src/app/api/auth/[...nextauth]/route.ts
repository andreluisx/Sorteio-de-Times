import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { server } from '@/api/server';
import { setCookie } from "nookies";
import {jwtDecode} from "jwt-decode";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' }, // Correção
      },
      async authorize(credentials, req) {
        try {
          const response = await server.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
      
          console.log("Login response:", response.data);
      
          if (response.data) {
            const { accessToken, refreshToken } = response.data;
      
            const decoded = jwtDecode(accessToken); // Aqui pega info do token
      
            const user = {
              id: decoded.sub,
              name: decoded.name || "", // ajuste conforme seu payload
              email: decoded.email,
              accessToken,
              refreshToken,
            };
      
            if (credentials?.rememberMe === true || credentials?.rememberMe === "true") {
              setCookie(null, "accessToken", accessToken, {
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
                secure: process.env.NODE_ENV === "production",
              });
      
              setCookie(null, "refreshToken", refreshToken, {
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
                secure: process.env.NODE_ENV === "production",
              });
            }
      
            return user;
          }
        } catch (error) {
          return {error: error.response?.data?.message}
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
        }
      } catch (error) {
        console.error("Erro ao gerar token JWT:", error);
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken || null,
        refreshToken: token.refreshToken || null,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
