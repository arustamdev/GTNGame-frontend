import { Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';

function PlayersOnline() {
  const [playersCount, setPlayersCount] = useState(0);

  useEffect(() => {
    function onPlayersOnline(value: number) {
      setPlayersCount((prev) => value);
    }

    socket.on('playersOnline', onPlayersOnline);

    return () => {
      socket.off('playersOnline');
    };
  }, []);

  return (
    <Flex p={'10px'}>
      <Spacer />
      <Text>Players Online: {playersCount}</Text>
    </Flex>
  );
}

export default PlayersOnline;
