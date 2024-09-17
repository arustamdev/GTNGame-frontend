import WebApp from '@twa-dev/sdk';
import { GuessResult, TrainingState } from '@/types/training';
import api from '@/http';

export class TrainingService {
  static async getTrainingState(): Promise<TrainingState> {
    const res = await api.get('/api/training');
    return res.data;
  }

  static async submitGuess(number: string): Promise<GuessResult> {
    const res = await api.post('/api/training/guess', { number });
    return res.data;
  }

  static async restartTraining(): Promise<void> {
    const res = await api.post('/api/training/restart');
  }
}

export class TrainingHistoryService {
  static getHistory(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.getItem('trainingHistory', (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return resolve([]);
        }
        const history: string[] = JSON.parse(result);
        return resolve(history);
      });
    });
  }

  static setHistory(history: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.setItem(
        'trainingHistory',
        JSON.stringify(history),
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result ?? false);
        }
      );
    });
  }

  static async pushToHistory(guess: string): Promise<boolean> {
    let history = await this.getHistory();
    if (history.length < 30) {
      history.push(guess);
    } else {
      history = history.slice(1);
      history.push(guess);
    }
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.setItem(
        'trainingHistory',
        JSON.stringify(history),
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result ?? false);
        }
      );
    });
  }

  static clearHistory(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.removeItem('trainingHistory', (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result ?? false);
      });
    });
  }

  static setTrainingActualNumber(number: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.setItem(
        'trainingActualNumber',
        number,
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result ?? false);
        }
      );
    });
  }

  static getTrainingActualNumber(): Promise<string> {
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.getItem('trainingActualNumber', (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result || '');
      });
    });
  }
}
