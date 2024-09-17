import { Box, Center, Spinner, VStack } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  caption?: string;
}

const defaultProps: LoadingSpinnerProps = {
  caption: '',
};

function LoadingSpinner({ caption }: LoadingSpinnerProps) {
  return (
    <Center h="100%">
      <VStack>
        <Spinner
          w="7rem"
          h="7rem"
          thickness="12px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        {caption && (
          <Box as="span" fontWeight="bold" fontSize="x-large">
            {caption}
          </Box>
        )}
      </VStack>
    </Center>
  );
}

LoadingSpinner.defaultProps = defaultProps;

export default LoadingSpinner;
