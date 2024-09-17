import { useEffect, useState } from 'react';
import { TrainingHistoryService } from '@/services/trainingService';

function useTrainingHistory() {
  const [history, setHistoryState] = useState<string[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  function setHistory(callback: ((prev: string[]) => string[]) | string[]) {
    let copy;
    if (typeof callback === 'function') {
      copy = callback(history);
    } else {
      copy = callback;
    }

    if (copy.length > 30) {
      setHistoryState(copy.slice(1));
    } else {
      setHistoryState(copy);
    }
  }

  useEffect(() => {
    (async () => {
      const history = await TrainingHistoryService.getHistory();
      setHistoryState((prev) => history);
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (initialized) {
        await TrainingHistoryService.setHistory(history);
      }
    })();
  }, [history]);

  return { history, setHistory };
}

export { useTrainingHistory };
