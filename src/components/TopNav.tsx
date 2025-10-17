import React from 'react'
import BdanbongaLogo from '../assets/bdanbonga.svg?react'

export default function TopNav() {
  // 오늘 날짜(YYYY-MM-DD) — date input의 초기값으로 사용
  const today = new Date().toISOString().slice(0, 10)

  // Tailwind 클래스 묶음(짧은 식별자 사용)
  const brand = "flex items-center"
  const logoCls = "w-8 h-8 rounded-full object-cover"
  // center 영역은 md에서 전체 메뉴를 보여주고, 모바일에서는 단일 링크만 노출
  const centerLinks = "hidden md:flex items-center gap-6 text-sm"
  const menuBtn = "md:hidden p-2 rounded-md hover:bg-gray-100"

  return (
    <nav className="fixed w-full top-0 bg-teal-800/60 backdrop-blur-sm border-b-2 border-b-teal-900 text-white z-50">
      <div className="container mx-auto px-4 h-16 w-full">
        {/* 3-column layout: each column uses flex-1 so center stays centered */}
        <div className="flex w-full h-16">
          {/* Left: logo (left-aligned) */}
          <div className="flex-1 flex items-center">
            <div className={brand}>
              <BdanbongaLogo className="w-8 h-8 fill-white"/>
              <span className="font-semibold ml-2">비단본가</span>
            </div>
          </div>

          {/* Center: 중앙 정렬 영역 */}
          <div className="flex-1 flex justify-center items-center">
            {/* 모바일에서는 단일 링크만 보이고, md 이상에서는 전체 메뉴를 보임 */}
            <a href="/bride" className="md:hidden text-sm">신부한복</a>
            <div className={centerLinks}>
              <a href="/bride" className="hover:opacity-90">신부한복</a>
              <a href="/groom" className="hover:opacity-90">신랑한복</a>
              <a href="/guest" className="hover:opacity-90">하객한복</a>
              <a href="/host" className="hover:opacity-90">혼주한복</a>
            </div>
          </div>

          {/* Right: 행사날짜(데스크탑), 검색폼, 모바일 메뉴 (right-aligned) */}
          <div className="flex-1 flex justify-end items-center gap-3">
            {/* 날짜 선택: md 이상에서 표시 */}
            <div className="hidden md:flex items-center text-sm gap-2">
              {/* 라벨이 줄어들지 않도록 flex-shrink-0와 공백 유지 */}
              <label htmlFor="event-date" className="flex-shrink-0 whitespace-nowrap">행사날짜</label>
              <input
                id="event-date"
                type="date"
                defaultValue={today}
                className="bg-white/10 text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors duration-150"
                aria-label="행사 날짜 선택"
              />
            </div>

            {/* 검색폼 (항상 표시) */}
            <form
              className="search flex items-center bg-white/10 hover:bg-white/20 rounded-md px-2 py-1 transition-colors duration-150 ease-in-out"
              role="search"
              id="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <i className="bi bi-search text-white mr-2" aria-hidden="true">🔍</i>
              <input
                className="form-control bg-transparent placeholder-white/70 text-white text-sm w-24 md:w-48 focus:outline-none"
                id="search-query"
                type="search"
                placeholder="검색"
                autoComplete="off"
                aria-label="검색"
              />
            </form>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden">
              <button aria-label="menu" className={menuBtn}>☰</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
