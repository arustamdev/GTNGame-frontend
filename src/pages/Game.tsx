import LoadingSpinner from '@/components/LoadingSpinner';
import { socket } from '@/socket';
import { Opponent } from '@/types/game';
import { useEffect, useState } from 'react';

function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState('');

  useEffect(() => {
    socket.emit('findMatch');

    function onMatchFound(value: Opponent) {
      setTemp('You are playing against ' + value.user.username);
      setIsLoading(false);
    }

    socket.on('matchfound', onMatchFound);

    return () => {
      socket.off('matchfound');
    };
  }, []);

  return isLoading ? (
    <LoadingSpinner caption="Looking for opponent..." />
  ) : (
    <p>{temp}</p>
  );
}

export default Game;
