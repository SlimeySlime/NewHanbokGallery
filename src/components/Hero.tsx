import React from 'react'

export default function Hero() {
  return (
    <main
      className="relative w-full h-screen"
      style={{
        backgroundImage: "url('/mainhanbok.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
          bdanbonga
        </h1>
      </div>
    </main>
  )
}
