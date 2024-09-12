import LoadingSpinner from '@/components/LoadingSpinner';
import { socket } from '@/socket';
import { useEffect, useState } from 'react';

function Game() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.emit('findMatch');
  }, []);

  return isLoading ? (
    <LoadingSpinner caption="Looking for opponent..." />
  ) : (
    <p>Game started</p>
  );
}

export default Game;
