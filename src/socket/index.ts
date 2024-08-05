import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(URL);

console.log(socket.connected);
