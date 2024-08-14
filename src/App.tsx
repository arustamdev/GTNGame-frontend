import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Training from './pages/Training';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Training />} />
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
