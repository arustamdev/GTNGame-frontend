import { TrainingHistoryService } from '@/services/trainingService';
import { useEffect, useState } from 'react';

function useTrainingHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const history = await TrainingHistoryService.getHistory();
      setHistory((prev) => history);
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
