import { Button } from '@chakra-ui/react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function SubmitButton({ isSubmitting, onClick, children }: SubmitButtonProps) {
  return (
    <Button
      isLoading={isSubmitting}
      onClick={onClick}
      w="100%"
      colorScheme="green"
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
