import { Button } from '@chakra-ui/react';

interface HistoryButtonProps {
  onOpen: () => void;
}

function HistoryButton({ onOpen }: HistoryButtonProps) {
  return (
    <Button m={'10px'} mb={'20px'} colorScheme={'blue'} onClick={onOpen}>
      History
    </Button>
  );
}

export default HistoryButton;
