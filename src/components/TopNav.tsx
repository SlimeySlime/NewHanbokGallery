import React from 'react'
import BdanbongaLogo from '../assets/bdanbonga.svg?react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setEventDate } from '../store/slices/eventDateSlice'
import { setCookie } from '../utils/cookieUtils'

export default function TopNav() {
	const dispatch = useAppDispatch()
	const eventDate = useAppSelector(state => state.eventDate.eventDate)

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = e.target.value
		dispatch(setEventDate(newDate))
		setCookie('eventDate', newDate, 30) // 30일 동안 쿠키 저장
	}

	const handleClearFilter = () => {
		dispatch(setEventDate(''))
		setCookie('eventDate', '', -1) // 쿠키 삭제
	}

	return (
		<nav className="fixed w-full top-0 bg-teal-800/60 backdrop-blur-sm border-b-2 border-b-teal-900 text-white z-50">
			<div className="flex mx-4 h-16 w-full">
				{/* 3-column layout: each column uses flex-1 so center stays centered */}
				<div className="flex w-full h-16 justify-between items-center?">
					{/* Left: logo (left-aligned) */}
					<div className="flex-1 flex items-center ">
						<div className="">
							<Link to="/" className="flex items-center gap-2">
								<BdanbongaLogo className="w-8 h-8 fill-white" />
								<span className="font-semibold ml-2">비단본가</span>
							</Link>
						</div>
					</div>

					{/* Center: 중앙 정렬 영역 */}
					<div className="hidden md:flex flex-2 justify-evenly items-center font-semibold gap-2">
						{/* 모바일에서는 단일 링크만 보이고, md 이상에서는 전체 메뉴를 보임 */}
						<Link to="/gallery" className="over:opacity-90">
							전체보기
						</Link>
						<Link to="/bride" className="over:opacity-90">
							신부한복
						</Link>
						<Link to="/groom" className="hover:opacity-90">
							신랑한복
						</Link>
						<Link to="/guest" className="hover:opacity-90">
							하객한복
						</Link>
						<Link to="/parent" className="hover:opacity-90">
							혼주한복
						</Link>
					</div>

					{/* Right: 행사날짜(데스크탑), 검색폼, 모바일 메뉴 (right-aligned) */}
					<div className="flex flex-2 justify-end items-center pr-12 font-semibold ">
						{/* 날짜 선택: md 이상에서 표시 */}
						<div className="hidden md:flex items-center text-sm p-4">
							{/* 라벨이 줄어들지 않도록 flex-shrink-0와 공백 유지 */}
							<label htmlFor="event-date" className="flex-shrink-0 whitespace-nowrap mr-2">
								행사날짜
							</label>
							<input
								id="event-date"
								type="date"
								value={eventDate}
								onChange={handleDateChange}
								className="bg-white/90 text-black font-bold rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors duration-150"
								aria-label="행사 날짜 선택"
							/>
						</div>
						<form
							className="hidden search md:flex items-center bg-white/10 hover:bg-white/20 rounded-md px-2 py-1 transition-colors duration-150 ease-in-out"
							role="search"
							id="search"
							onSubmit={e => e.preventDefault()}
						>
							<i className="bi bi-search text-white mr-2" aria-hidden="true">
								🔍
							</i>
							<input
								className="form-control bg-transparent placeholder-white/90 text-white text-sm w-24 md:w-48 focus:outline-none"
								id="search-query"
								type="search"
								placeholder="검색"
								autoComplete="off"
								aria-label="검색"
							/>
						</form>

						{/* 모바일 메뉴 버튼 */}
						<div className="md:hidden">
							<button aria-label="menu" className="md:hidden p-2 rounded-md hover:bg-gray-100 text-black">
								☰
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
