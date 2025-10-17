import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Home from './pages/Home'
import Bride from './pages/Bride'


function App() {
  const [count, setCount] = useState(0)

  return (
    // fixed nav 사용 시 상단 오프셋(pt-16) 필요 (nav 높이 h-16)
    <BrowserRouter>
      <div className='flex flex-col m-auto min-h-screen justify-between pt-16'>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bride" element={<Bride />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
 }

 export default App
