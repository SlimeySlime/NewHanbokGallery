import React from 'react'

const SkeletonCard = () => (
	<div>
		<div className="aspect-square bg-gray-200 rounded-md mb-2 animate-pulse"></div>
		<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-1"></div>
		<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
	</div>
)

export default function GallerySkeleton() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{/* 보통 한 화면에 보이는 개수만큼 미리 렌더링합니다 (e.g., 12개) */}
			{Array.from({ length: 12 }).map((_, index) => (
				<SkeletonCard key={index} />
			))}
		</div>
	)
}
