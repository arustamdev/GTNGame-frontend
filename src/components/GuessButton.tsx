import { Button } from '@chakra-ui/react';

interface GuessButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

function GuessButton({ isSubmitting, onClick }: GuessButtonProps) {
  return (
    <Button
      isLoading={isSubmitting}
      onClick={onClick}
      w={'100%'}
      colorScheme="green"
    >
      Guess
    </Button>
  );
}

export default GuessButton;
