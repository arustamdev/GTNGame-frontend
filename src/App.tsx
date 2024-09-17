import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Training from './pages/Training';
import Game from './pages/Game';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/training" element={<Training />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  );
}
