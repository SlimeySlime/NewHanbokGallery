// import React from 'react'

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
			{/* 전체 오버레이: 화면 100% 커버 */}
			<div className="absolute inset-0 bg-black/10 z-10"></div>

			{/* main_text: 왼쪽 50%만 차지하도록 변경 */}
			<div id='main_text' className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center px-4 z-20">
				<h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
					bdanbonga
				</h1>
			</div>
		</main>
	)
}
