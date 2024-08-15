import {
  TrainingHistoryService,
  TrainingService,
} from '@/services/trainingService';
import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  HStack,
  keyframes,
  PinInput,
  PinInputField,
  ScaleFade,
  Slide,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function Training() {
  const [isFinished, setIsFinished] = useState<null | boolean>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentMatches, setCurrentMatches] = useState<null | number>(null);
  const [previousGuess, setPreviousGuess] = useState<string>('');

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

    setHistory((history) => {
      const copy = [...history, `${inputValue} - ${matches}`];
      if (copy.length > 30) {
        return copy.slice(1);
      }
      return copy;
    });

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
      const history = await TrainingHistoryService.getHistory();
      setIsFinished(isFinished);
      setHistory(history);

      if (isFinished) {
        const actualNumber =
          await TrainingHistoryService.getTrainingActualNumber();
        setPreviousGuess(actualNumber);
        setCurrentMatches(4);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (history.length !== 0) {
        const res = await TrainingHistoryService.setHistory(history);
      }
    })();
  }, [history]);

  return isLoading ? (
    <Center h={'100%'}>
      <Spinner
        w={'7rem'}
        h={'7rem'}
        thickness="12px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  ) : (
    <>
      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          w={'100%'}
          h={'100%'}
          position={'fixed'}
          style={{ zIndex: -1 }}
          onClick={onClose}
        ></Box>
        <Flex
          w={'fit-content'}
          h={'100%'}
          color="white"
          bg="grey"
          shadow="md"
          p={'10px'}
        >
          <VStack pr={'10px'}>
            {history.map((element) => (
              <p key={element}>{element}</p>
            ))}
          </VStack>
          <Button alignSelf={'flex-end'} mb={'10px'} onClick={onClose}>
            Close
          </Button>
        </Flex>
      </Slide>
      <Center h={'80%'}>
        <VStack>
          <Circle size="6rem" bg="slategrey" color="white">
            <ScaleFade initialScale={0.1} in={!isSubmitting}>
              <Box as="span" fontWeight="bold" fontSize="xx-large">
                {currentMatches !== null ? currentMatches.toString() : '?'}
              </Box>
            </ScaleFade>
          </Circle>
          <ScaleFade initialScale={0.1} in={!isSubmitting}>
            <Box as="span" fontWeight="bold" fontSize="x-large">
              Numbers are correct in
            </Box>
            <Center>
              <HStack zIndex={-1}>
                <PinInput size={'sm'} value={previousGuess} variant={'filled'}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </ScaleFade>

          {isFinished ? (
            <Box mt={'2rem'}>
              <Button onClick={onRestart} w={'100%'} colorScheme="yellow">
                Restart
              </Button>
            </Box>
          ) : (
            <Box>
              <HStack mb={'0.5rem'} mt={'2rem'}>
                <PinInput
                  size={'lg'}
                  value={inputValue}
                  onChange={(value) => handleInput(value)}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>

              <Button
                isLoading={isSubmitting}
                onClick={submitGuess}
                w={'100%'}
                colorScheme="green"
              >
                Guess
              </Button>
            </Box>
          )}
        </VStack>
      </Center>
      <Flex h={'20%'} placeItems={'end'}>
        <Button m={'10px'} mb={'20px'} colorScheme={'blue'} onClick={onOpen}>
          History
        </Button>
      </Flex>
    </>
  );
}

export default Training;
