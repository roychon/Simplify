import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { Route, Router, Routes } from 'react-router-dom';
import SimplifyText from './pages/SimplifyText';
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0);
  // TODO: set Router
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simplify-text" element={<SimplifyText/>}/>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    </>
  );
}

export default App;

// React Router: useNavigate hook -> returns a function
