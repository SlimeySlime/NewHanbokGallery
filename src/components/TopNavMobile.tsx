import React from 'react'
import BdanbongaLogo from '../assets/bdanbonga.svg?react'

export default function TopNavMobile() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-teal-800/80 backdrop-blur-sm border-b-2 border-b-teal-900 text-white">
      <div className="flex items-center justify-between px-4 h-12">
        {/* Left: logo */}
        <div className="flex items-center gap-2">
          <BdanbongaLogo className="w-6 h-6 fill-white" />
          <span className="text-sm font-medium">비단본가</span>
        </div>

        {/* Right: search + menu */}
        <div className="flex items-center gap-2">
          <button aria-label="search" className="p-2 rounded-md hover:bg-white/10">🔍</button>
          <button aria-label="menu" className="p-2 rounded-md">☰</button>
        </div>
      </div>
    </nav>
  )
}
