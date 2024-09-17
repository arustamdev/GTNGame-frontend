import { PinInputField, PinInput as PinInputChakra } from '@chakra-ui/react';

interface PinInputProps {
  value: string;
  onInput: (value: string) => void;
}

function PinInput({ value, onInput }: PinInputProps) {
  return (
    <PinInputChakra size="lg" value={value} onChange={(v) => onInput(v)}>
      <PinInputField />
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInputChakra>
  );
}

export default PinInput;
