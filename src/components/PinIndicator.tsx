import { HStack, PinInput, PinInputField } from '@chakra-ui/react';

interface PinIndicatorProps {
  value: string;
}

function PinIndicator({ value }: PinIndicatorProps) {
  return (
    <HStack style={{ pointerEvents: 'none' }}>
      <PinInput size={'sm'} value={value} variant={'filled'}>
        <PinInputField tabIndex={-1} />
        <PinInputField tabIndex={-1} />
        <PinInputField tabIndex={-1} />
        <PinInputField tabIndex={-1} />
      </PinInput>
    </HStack>
  );
}

export default PinIndicator;
