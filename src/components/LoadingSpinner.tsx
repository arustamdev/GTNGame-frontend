import { Center, Spinner } from '@chakra-ui/react';

function LoadingSpinner() {
  return (
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
  );
}

export default LoadingSpinner;
