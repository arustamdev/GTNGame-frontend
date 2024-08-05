import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Home />
    // <Routes>
    //   {/* <Route path="/" element={<Home />} />
    //   <Route path="*" element={<NotFound />} /> */}
    // </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </HashRouter>
  );
}
