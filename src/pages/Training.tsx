import LoadingSpinner from '@/components/LoadingSpinner';
import HistoryButton from '@/components/HistoryButton';
import HistoryDrawer from '@/components/Training/HistoryDrawer';
import PinInput from '@/components/PinInput';
import {
  TrainingHistoryService,
  TrainingService,
} from '@/services/trainingService';
import {
  Box,
  Center,
  Flex,
  HStack,
  ScaleFade,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import RestartButton from '@/components/RestartButton';
import MatchesCount from '@/components/MatchesCount';
import PinIndicator from '@/components/PinIndicator';
import GuessButton from '@/components/GuessButton';
import { useTrainingHistory } from '@/hooks/useTrainingHistory';

function Training() {
  const [isFinished, setIsFinished] = useState<null | boolean>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentMatches, setCurrentMatches] = useState<null | number>(null);
  const [previousGuess, setPreviousGuess] = useState<string>('');

  const { history, setHistory } = useTrainingHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleInput(value: string) {
    setInputValue(value);
  }

  async function submitGuess() {
    if (inputValue.length !== 4) {
      //TODO:
      // indicate error in UI
      return;
    }

    setIsSubmitting(true);

    const { matches } = await TrainingService.submitGuess(inputValue);
    if (matches === 4) {
      setIsFinished(true);
      await TrainingHistoryService.setTrainingActualNumber(inputValue);
    }
    setPreviousGuess(inputValue);
    setCurrentMatches(matches);

    setHistory((history) => [...history, `${inputValue} - ${matches}`]);

    setIsSubmitting(false);
  }

  async function onRestart() {
    setIsLoading(true);

    await TrainingService.restartTraining();
    await TrainingHistoryService.clearHistory();

    setHistory([]);
    setIsFinished(false);
    setCurrentMatches(null);
    setInputValue('');
    setPreviousGuess('');
    setInputValue('');

    setIsLoading(false);
  }

  useEffect(() => {
    (async () => {
      const { isFinished } = await TrainingService.getTrainingState();
      setIsFinished(isFinished);

      if (isFinished) {
        const actualNumber =
          await TrainingHistoryService.getTrainingActualNumber();
        setPreviousGuess(actualNumber);
        setCurrentMatches(4);
      }

      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HistoryDrawer isOpen={isOpen} onClose={onClose} history={history} />

      <Center h={'80%'}>
        <VStack>
          <MatchesCount isSubmitting={isSubmitting} matches={currentMatches} />
          <ScaleFade initialScale={0.1} in={!isSubmitting}>
            <Box as="span" fontWeight="bold" fontSize="x-large">
              Numbers are correct in
            </Box>
            <Center>
              <PinIndicator value={previousGuess} />
            </Center>
          </ScaleFade>

          {isFinished ? (
            <Box mt={'2rem'}>
              <RestartButton onRestart={onRestart} />
            </Box>
          ) : (
            <Box>
              <HStack mb={'0.5rem'} mt={'2rem'}>
                <PinInput value={inputValue} onInput={handleInput} />
              </HStack>

              <GuessButton isSubmitting={isSubmitting} onClick={submitGuess} />
            </Box>
          )}
        </VStack>
      </Center>
      <Flex h={'20%'} placeItems={'end'}>
        <HistoryButton onOpen={onOpen} />
      </Flex>
    </>
  );
}

export default Training;
