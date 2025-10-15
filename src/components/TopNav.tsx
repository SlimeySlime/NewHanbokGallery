import React from 'react'

export default function TopNav() {
  // Tailwind 클래스 묶음(짧은 식별자 사용)
  // fixed 제거 — 필요하면 "sticky top-0"로 바꿀 수 있음
  // const navBase = "bg-white/80 backdrop-blur-sm border-b z-50"
  // const container = "container mx-auto px-4 h-16 flex items-center justify-between"
  const brand = "flex items-center gap-3"
  const logo = "w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white font-semibold"
  const links = "hidden md:flex items-center gap-4 text-sm text-gray-700"
  const menuBtn = "md:hidden p-2 rounded-md hover:bg-gray-100"

  return (
    // 네비게이션만 유지 (히어로 섹션은 분리됨)
    <nav className="bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="flex container items-center justify-between mx-auto px-4 h-16">
        <a href="/" className={brand}>
          <div className={logo}>B</div>
          <span className="font-semibold">bdanbonga</span>
        </a>
        <div className={links}>
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#docs" className="hover:text-gray-900">Docs</a>
          <a href="#about" className="hover:text-gray-900">About</a>
        </div>
        <div className="md:hidden">
          <button aria-label="menu" className={menuBtn}>☰</button>
        </div>
      </div>
    </nav>
  )
}
