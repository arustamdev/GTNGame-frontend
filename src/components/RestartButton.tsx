import { Button } from '@chakra-ui/react';

interface RestartButtonProps {
  onRestart: () => void;
}

function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <Button onClick={onRestart} w="100%" colorScheme="yellow">
      Restart
    </Button>
  );
}

export default RestartButton;
