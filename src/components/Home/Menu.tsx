import {
  Center,
  Container,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Menu() {
  const confirmPlayModal = useDisclosure();
  const confirmTrainingModal = useDisclosure();

  return (
    <>
      <Center h="60%">
        <Container>
          <Stack direction="column">
            <Button colorScheme="teal" onClick={confirmPlayModal.onOpen}>
              Play
            </Button>
            <Button colorScheme="teal" onClick={confirmTrainingModal.onOpen}>
              Training mode
            </Button>
          </Stack>
        </Container>
      </Center>
      <Modal
        isOpen={confirmTrainingModal.isOpen}
        onClose={confirmTrainingModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent alignItems="center" m="10px">
          <ModalHeader>Enter training mode?</ModalHeader>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={confirmTrainingModal.onClose}
            >
              No
            </Button>
            <Link to="/training">
              <Button w="100%" colorScheme="green">
                Yes, continue
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={confirmPlayModal.isOpen}
        onClose={confirmPlayModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent alignItems="center" m="10px">
          <ModalHeader>Choose your number</ModalHeader>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmPlayModal.onClose}>
              No
            </Button>
            <Link to="/chooseNumber">
              <Button w="100%" colorScheme="green">
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
