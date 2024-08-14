import Header from '@/components/Home/Header';
import Menu from '@/components/Home/Menu';
import PlayersOnline from '@/components/Home/PlayersOnline';
import { socket } from '@/socket';
import { Flex } from '@chakra-ui/react';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

function Home() {
  return (
    <Flex h={'100%'} flexDirection={'column'}>
      <Header />
      <PlayersOnline />
      <Menu />
    </Flex>
  );
}

export default Home;
