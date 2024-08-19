import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import {Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* TODO: have NavBar be here, so it is always present */}
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<NotFound />} />
      {/* TODO: create Routes for simplify-file, simplify-text */}
    </Routes>
  )
}

export default App
