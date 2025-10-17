import React from 'react'

export default function Footer() {
	const footerBase = "w-full bg-white/80 backdrop-blur-sm border-t z-40"
	const container = "container mx-auto px-4 py-3 text-sm text-center text-gray-600"
	const linkClass = "underline mx-2"

	return (
		<footer className={footerBase}>
			<div className={container}>
				© {new Date().getFullYear()} bdanbonga — Made with Vite + React
				<div className="mt-1">
					<a href="https://vite.dev" className={linkClass}>Vite</a>
					<a href="https://react.dev" className={linkClass}>React</a>
				</div>
			</div>
		</footer>
	)
}
