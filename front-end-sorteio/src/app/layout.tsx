"use client";
import { Roboto } from 'next/font/google';
import './globals.css';
import NavbarTheme from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { usePathname } from "next/navigation";
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

const inter = Roboto({ subsets: ['latin'], weight: '700' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const UserPage = pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/";

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200`}>
        <SessionProvider> 
          <NavbarTheme />
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className="flex-row flex pr-1">
            {!UserPage && <SideBar />}
            {children}
          </div>

          <div className='flex size-full'>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
