import { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import SimplifyText from './pages/SimplifyText';

function App() {
  const [count, setCount] = useState(0);
  // TODO: set Router
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/simplify-text' element={<SimplifyText />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

// React Router: useNavigate hook -> returns a function
