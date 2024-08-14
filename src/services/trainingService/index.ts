import { TrainingState } from '@/types/training';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';

const api = axios.create({
  withCredentials: true,
});

api.defaults.headers.common['Telegram-Data'] = WebApp.initData;
//api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default class TrainingService {
  static async getTrainingState(): Promise<TrainingState> {
    const res = await api.get('/api/training');
    return res.data;
  }
}
