import React, { useState } from 'react';
import BdanbongaLogo from '../assets/bdanbonga.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEventDate } from '../store/slices/eventDateSlice';
import { setCookie } from '../utils/cookieUtils';

export default function TopNav() {
  const dispatch = useAppDispatch();
  const eventDate = useAppSelector(state => state.eventDate.eventDate);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    dispatch(setEventDate(newDate));
    setCookie('eventDate', newDate, 30); // 30일 동안 쿠키 저장
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm(''); // Optional: clear search bar after search
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full top-0 bg-teal-800/60 backdrop-blur-sm border-b-2 border-b-teal-900 text-white z-50">
        <div className="flex mx-4 h-16 w-full">
          {/* 3-column layout: each column uses flex-1 so center stays centered */}

          <div className="flex w-full h-16 justify-between items-center">

            <div className="flex flex-1 items-center 
            bg-blue-500/20">
              <div className="">
                <Link to="/" className="flex items-center m-2">
                  <BdanbongaLogo className="w-8 h-8 fill-white m-2" />
                  <span className="font-semibold text-3xl text-nowrap font-dimibang">비단본가</span>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center items-center font-semibold gap-2
            bg-red-200/50">
              {/* 모바일에서는 단일 링크만 보이고, md 이상에서는 전체 메뉴를 보임 */}
              <Link to="/gallery" className="over:opacity-90 text-nowrap">
                전체보기
              </Link>
              <Link to="/bride" className="over:opacity-90 text-nowrap">
                신부한복
              </Link>
              <Link to="/groom" className="hover:opacity-90 text-nowrap">
                신랑한복
              </Link>
              <Link to="/guest" className="hover:opacity-90 text-nowrap">
                하객한복
              </Link>
              <Link to="/parent" className="hover:opacity-90 text-nowrap">
                혼주한복
              </Link>
            </div>

            {/* Right: 행사날짜(데스크탑), 검색폼, 모바일 메뉴 (right-aligned) */}
            <div className="flex flex-1 justify-end items-center pr-12 font-semibold
                        bg-blue-500/50">
              {/* 날짜 선택: md 이상에서 표시 */}
              <div className="hidden md:flex items-center text-sm p-4">
                {/* 라벨이 줄어들지 않도록 flex-shrink-0와 공백 유지 */}
                <label htmlFor="event-date" className="flex-1 whitespace-nowrap mr-2">
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
                className="hidden search rounded-md px-2 py-1 md:flex items-center 
                bg-white/10 hover:bg-white/20  
                transition-colors duration-150 ease-in-out"
                role="search"
                id="search"
                onSubmit={handleSearchSubmit}
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </form>

              {/* 모바일 메뉴 버튼 */}
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} aria-label="menu" className="p-2 rounded-md text-white">
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-teal-900/95 z-40 flex flex-col items-center justify-center md:hidden">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-white text-3xl">&times;</button>
          <Link to="/gallery" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">전체보기</Link>
          <Link to="/bride" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">신부한복</Link>
          <Link to="/groom" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">신랑한복</Link>
          <Link to="/guest" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">하객한복</Link>
          <Link to="/parent" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">혼주한복</Link>
        </div>
      )}
    </>
  );
}
