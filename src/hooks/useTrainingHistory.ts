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
      const h = await TrainingHistoryService.getHistory();
      setHistoryState(h);
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (initialized) {
        await TrainingHistoryService.setHistory(history);
      }
    })();
  }, [history, initialized]);

  return { history, setHistory };
}

export default useTrainingHistory;
