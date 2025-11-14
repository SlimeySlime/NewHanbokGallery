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
        <div className="mx-auto px-4">
          <div className="flex flex-col md:flex-row md:h-16">

            {/* Top Row (Mobile) / Left Section (Desktop) */}
            <div className="flex justify-between items-center h-16">
              <div className="shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <BdanbongaLogo className="w-8 h-8 fill-white mr-2" />
                  <span className="font-semibold text-3xl text-nowrap font-dimibang">비단본가</span>
                </Link>
              </div>
              {/* 모바일 메뉴 버튼 */}
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} aria-label="menu" 
                  className="rounded-md text-black">
                  ☰
                </button>
              </div>
            </div>


            <div className="flex items-center justify-end py-2 md:py-0">
              {/* Event Date Picker */}
              <div className="flex items-center text-sm">
                <label htmlFor="event-date" className="whitespace-nowrap mr-2">
                  행사날짜
                </label>
                <input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={handleDateChange}
                  className="bg-white/90 text-black font-bold rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="행사 날짜 선택"
                />
              </div>
              
              
              <form
                className="hidden md:flex items-center ml-4 bg-white/10 hover:bg-white/20 rounded-md px-2 py-1"
                onSubmit={handleSearchSubmit}
              >
                <i className="bi bi-search text-white mr-2">🔍</i>
                <input
                  className="bg-transparent placeholder-white/90 text-white text-sm w-32 focus:outline-none"
                  type="search"
                  placeholder="검색"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
            <div className="flex items-center overflow-x-auto whitespace-nowrap 
              md:flex md:justify-evenly md:flex-1 md:gap-2 py-2 md:py-0 no-scrollbar">
              <Link to="/gallery" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">전체보기</Link>
              <Link to="/bride" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">신부한복</Link>
              <Link to="/groom" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">신랑한복</Link>
              <Link to="/guest" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">하객한복</Link>
              <Link to="/parent" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">혼주한복</Link>
            </div>

            
            
          </div>
        </div>
      </nav>

      {/* Mobile Menu Container */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ease-in-out duration-300 
                    ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Overlay for closing menu on outside click */}
        <div className="absolute inset-0 bg-black/50" onClick={toggleMobileMenu}></div>

        {/* Mobile Menu Sidebar */}
        <div
          className={`relative w-[70vw] h-full bg-teal-900 z-50 
                      transform transition-transform ease-in-out duration-300 
                      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-white text-3xl">&times;</button>
          <div className="flex flex-col items-center justify-center h-full py-16">
            <Link to="/gallery" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">전체보기</Link>
            <Link to="/bride" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">신부한복</Link>
            <Link to="/groom" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">신랑한복</Link>
            <Link to="/guest" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">하객한복</Link>
            <Link to="/parent" onClick={handleMobileLinkClick} className="text-white text-2xl my-4">혼주한복</Link>
          </div>
        </div>
      </div>
    </>
  );
}
