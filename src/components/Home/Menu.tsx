import {
  Center,
  Container,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center h={'60%'}>
        <Container>
          <Stack direction={'column'}>
            <Button colorScheme="teal">Play</Button>
            <Button colorScheme="teal" onClick={onOpen}>
              Training mode
            </Button>
          </Stack>
        </Container>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent alignItems={'center'} m={'10px'}>
          <ModalHeader>Enter training mode?</ModalHeader>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
            <Link to={'/training'}>
              <Button w={'100%'} colorScheme="green">
                Yes, continue
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Menu;
