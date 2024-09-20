import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import PinInput from '@/components/PinInput';
import SubmitButton from '@/components/SubmitButton';
import { GameService } from '@/services/gameService';
import { useNavigate } from 'react-router-dom';

function ChooseNumber() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleInput(value: string) {
    setInputValue(value);
  }

  async function submitGuess() {
    if (inputValue.length !== 4) {
      // TODO:
      // indicate error in UI

      return;
    }

    setIsSubmitting(true);
    const statusCode = await GameService.setGuessNumber(inputValue);

    if (statusCode === 200) {
      navigate('/game');
    } else {
      setIsError(true);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {isError && (
        <Alert status="error" position={'absolute'}>
          <AlertIcon />
          <Box>
            <AlertTitle>Error occured!</AlertTitle>
            <AlertDescription>Try again later</AlertDescription>
          </Box>
          <CloseButton ml={'auto'} onClick={() => setIsError(false)} />
        </Alert>
      )}
      <Center h="80%">
        <VStack>
          <Box as="span" fontWeight="bold" fontSize="x-large">
            Choose your number
          </Box>
          <Box>
            <HStack mb="0.5rem" mt="2rem">
              <PinInput value={inputValue} onInput={handleInput} />
            </HStack>

            <SubmitButton isSubmitting={isSubmitting} onClick={submitGuess}>
              Find match
            </SubmitButton>
          </Box>
        </VStack>
      </Center>
    </>
  );
}

export default ChooseNumber;
