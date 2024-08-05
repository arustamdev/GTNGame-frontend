import { Center, Container, Stack, Button } from '@chakra-ui/react';

function Menu() {
  return (
    <Center h={'60%'}>
      <Container>
        <Stack direction={'column'}>
          <Button colorScheme="teal">Play</Button>
          <Button colorScheme="teal">Training mode</Button>
        </Stack>
      </Container>
    </Center>
  );
}

export default Menu;
