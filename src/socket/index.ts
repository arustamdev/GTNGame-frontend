import WebApp from '@twa-dev/sdk';
import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(URL, {
  auth: {
    telegram_data: WebApp.initData,
  },
});

export { socket };
