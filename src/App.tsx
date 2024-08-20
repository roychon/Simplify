import { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import SimplifyText from './pages/SimplifyText';
import SimplifyFile from './pages/SimplifyFile';
import Nav from './components/Nav';

function App() {
  const [count, setCount] = useState(0);
  // TODO: set Router
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/simplify-text' element={<SimplifyText />} />
        <Route path='/simplify-file' element={<SimplifyFile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

// React Router: useNavigate hook -> returns a function
