import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  HStack,
  Center,
  Box,
  Circle,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: string[];
}

function HistoryDrawer({ isOpen, onClose, history }: HistoryDrawerProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>History</DrawerHeader>

        <DrawerBody>
          {history.map((element, indHistory) => {
            const [number, matches] = element.split(' - ');
            const numbers = number.split('');

            return (
              <HStack key={indHistory} gap="3px">
                {numbers.map((n, indNumber) => (
                  <Center
                    key={indNumber}
                    w="25px"
                    h="25px"
                    bg="grey"
                    color="white"
                  >
                    <Box as="span" fontWeight="bold" fontSize="sm">
                      {n}
                    </Box>
                  </Center>
                ))}
                <Circle m="4px" size="27px" bg="tomato" color="white">
                  <Box as="span" fontWeight="bold" fontSize="sm">
                    {matches}
                  </Box>
                </Circle>
              </HStack>
            );
          })}
        </DrawerBody>

        <DrawerFooter>
          <Button alignSelf="flex-end" mb="10px" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default HistoryDrawer;
