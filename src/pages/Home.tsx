import { Flex } from '@chakra-ui/react';
import Header from '@/components/Home/Header';
import Menu from '@/components/Home/Menu';
import PlayersOnline from '@/components/Home/PlayersOnline';

function Home() {
  return (
    <Flex h="100%" flexDirection="column">
      <Header />
      <PlayersOnline />
      <Menu />
    </Flex>
  );
}

export default Home;
