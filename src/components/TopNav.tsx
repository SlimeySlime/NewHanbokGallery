import React from 'react'
import BdanbongaLogo from '../assets/bdanbonga.svg?react'
import { Link } from 'react-router-dom'

export default function TopNav() {
	// 오늘 날짜(YYYY-MM-DD) — date input의 초기값으로 사용
	const today = new Date().toISOString().slice(0, 10)

	// Tailwind 클래스 묶음(짧은 식별자 사용)
	const brand = "flex items-center"
	// center 영역은 md에서 전체 메뉴를 보여주고, 모바일에서는 단일 링크만 노출

	return (
		<nav className="fixed w-full top-0 bg-teal-800/60 backdrop-blur-sm border-b-2 border-b-teal-900 text-white z-50">
			<div className="container mx-4 h-16 w-full">
        {/* 3-column layout: each column uses flex-1 so center stays centered */}
				<div className="flex w-full h-16 justify-between items-center?">
					{/* Left: logo (left-aligned) */}
					<div className="flex-1 flex items-center bg-slate-300/50">
						<div className={brand}>
							<Link to="/" className="flex items-center gap-2">
								<BdanbongaLogo className="w-8 h-8 fill-white"/>
								<span className="font-semibold ml-2">비단본가</span>
							</Link>
						</div>
					</div>

					{/* Center: 중앙 정렬 영역 */}
					<div className="flex-1 flex justify-center items-center bg-blue-500/50 gap-2">
						{/* 모바일에서는 단일 링크만 보이고, md 이상에서는 전체 메뉴를 보임 */}
						<Link to="/bride" className="md:hidden text-sm">신부한복</Link>
						<div className="hidden md:flex items-center text-sm">
							<Link to="/bride" className="hover:opacity-90">신부한복</Link>
							<Link to="/groom" className="hover:opacity-90">신랑한복</Link>
							<Link to="/guest" className="hover:opacity-90">하객한복</Link>
							<Link to="/host" className="hover:opacity-90">혼주한복</Link>
						</div>
					</div>

					{/* Right: 행사날짜(데스크탑), 검색폼, 모바일 메뉴 (right-aligned) */}
					<div className="flex-1 flex justify-end items-center bg-red-500/50 p-4">
						{/* 날짜 선택: md 이상에서 표시 */}
						<div className="hidden md:flex items-center text-sm p-4">
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
							className="hidden search md:flex items-center bg-white/10 hover:bg-white/20 rounded-md px-2 py-1 transition-colors duration-150 ease-in-out"
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
							<button aria-label="menu" className="md:hidden p-2 rounded-md hover:bg-gray-100 text-black">☰</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
