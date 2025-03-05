import axios from 'axios'

export const server = axios.create({
  baseURL: 'http://localhost:4000',
  validateStatus: function (status) {
    // Lança erros para status fora do intervalo 2xx
    return status >= 200 && status < 300;
  },
});