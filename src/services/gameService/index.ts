import WebApp from '@twa-dev/sdk';

export class GameHistoryService {
  static getHistory(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      WebApp.CloudStorage.getItem('gameHistory', (error, result) => {
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
        'gameHistory',
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
        'gameHistory',
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
      WebApp.CloudStorage.removeItem('gameHistory', (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result ?? false);
      });
    });
  }
}
