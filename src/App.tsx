import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Bride from './pages/Bride'
import Gallery from './pages/Gallery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EventDateProvider } from './context/EventDateContext'

// QueryClient는 컴포넌트 외부에서 생성하여 재생성 방지
const queryClient = new QueryClient()

function App() {
	// const [count, setCount] = useState(0)

	function AppContent() {
		// 앱 최초 렌더에서 갤러리 데이터를 불러오게 함 (React Query가 캐시/중복 방지 처리)
		// useGallery()

		return (
			<div className='flex flex-col m-auto min-h-screen justify-between'>
				<TopNav />
				<main className="pt-16 flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/gallery" element={<Gallery />} />
						<Route path="/bride" element={<Bride />} />
					</Routes>
				</main>
				<Footer />
			</div>
		)
	}

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<EventDateProvider>
					<AppContent />
				</EventDateProvider>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
