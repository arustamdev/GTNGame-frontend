import WebApp from '@twa-dev/sdk';
import axios from 'axios';

const api = axios.create({
  withCredentials: true,
});

api.defaults.headers.common['Telegram-Data'] = WebApp.initData;

export default api;
