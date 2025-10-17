import React from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <main>
        <Hero />
        {/* <div className='carousel-container'>
            <div className='carousel-item'>dd</div>
            <div className='carousel-item'>dd</div>
            <div className='carousel-item'>dd</div>
            <div className='carousel-item'>dd</div>
        </div> */}
        <div className="p-6">
        <div className='flex gap-4'>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1 className='font-bold underline mt-6'>Vite + React</h1>
        <div className="card mt-4">
          <p>Edit <code>src/pages/Home.tsx</code> and save to test HMR</p>
        </div>
      </div>
    </main>
  )
}