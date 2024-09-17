import { Box, Center, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PinInput from '@/components/PinInput';
import {
  TrainingHistoryService,
  TrainingService,
} from '@/services/trainingService';
import GuessButton from '@/components/SubmitButton';
import { useTrainingHistory } from '@/hooks/useTrainingHistory';
import SubmitButton from '@/components/SubmitButton';

function ChooseNumber() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { history, setHistory } = useTrainingHistory();

  function handleInput(value: string) {
    setInputValue(value);
  }

  async function submitGuess() {
    if (inputValue.length !== 4) {
      // TODO:
      // indicate error in UI
    }
  }

  return (
    <Center h="80%">
      <VStack>
        <Box>
          <HStack mb="0.5rem" mt="2rem">
            <PinInput value={inputValue} onInput={handleInput} />
          </HStack>

          <SubmitButton isSubmitting={isSubmitting} onClick={submitGuess}>
            Confirm
          </SubmitButton>
        </Box>
      </VStack>
    </Center>
  );
}

export default ChooseNumber;
