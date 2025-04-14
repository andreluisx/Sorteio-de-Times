import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';

export const server = axios.create({
  baseURL: 'http://192.168.1.108:4000',
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

server.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken || Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return Promise.reject(error);
  }
});

// Adiciona um interceptor de resposta
server.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente se estiver ok
  (error) => {
    if (typeof window !== 'undefined') {
      if (error.response && error.response.status === 401) {
        signOut({ callbackUrl: '/auth/login' });
      }
    }
    return Promise.reject(error); // Propaga o erro para tratamento posterior
  }
);
