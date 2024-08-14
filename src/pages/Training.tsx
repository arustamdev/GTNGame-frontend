import TrainingService from '@/services/trainingService';
import {
  Button,
  Center,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Slide,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function Training() {
  const [isFinished, setIsFinished] = useState<null | boolean>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const res = await TrainingService.getTrainingState();
      setIsFinished(res.isFinished);
    })();
  }, []);

  return isFinished === null ? (
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
        <Flex
          w={'fit-content'}
          h={'100%'}
          color="white"
          bg="grey"
          shadow="md"
          p={'10px'}
        >
          <VStack pr={'10px'}>
            <p>1243 - 1</p>
            <p>1243 - 1</p>
            <p>1243 - 1</p>
            <p>1243 - 1</p>
          </VStack>
          <Button alignSelf={'flex-end'} mb={'10px'} onClick={onClose}>
            Close
          </Button>
        </Flex>
      </Slide>
      <Center h={'80%'}>
        <VStack>
          <HStack>
            <PinInput size={'lg'}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Button w={'100%'} colorScheme="green">
            Guess
          </Button>
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
