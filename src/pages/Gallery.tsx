import React from 'react'
import { useAppSelector } from '../store/hooks'
import { useGetFilteredGalleryQuery } from '../store/api/galleryApi'
import GallerySkeleton from '../components/GallerySkeleton'

export default function Gallery() {
	const { rentalStart, rentalEnd } = useAppSelector(state => state.eventDate)
	const isFiltered = !!rentalStart && !!rentalEnd

	const {
		data: items = [], // 데이터가 아직 없을 때를 대비해 기본값으로 빈 배열을 설정
		isLoading,
		isError,
		error,
		refetch,
		isFetching,
	} = useGetFilteredGalleryQuery(
		{ rentalStart, rentalEnd },
		// rentalStart 또는 rentalEnd 값이 없으면 쿼리를 실행하지 않음 (skip)
		{ skip: !isFiltered },
	)

	if (isLoading) {
		return (
			<div className="px-6 pb-6">
				<h2 className="text-2xl font-semibold mb-4">갤러리</h2>
				<GallerySkeleton />
			</div>
		)
	}

	if (isError) {
		// RTK Query의 에러 객체는 구조가 다를 수 있으므로 더 안전하게 처리
		const errorMessage =
			(error && typeof error === 'object' && 'error' in error ? String(error.error) : String(error)) ||
			'알 수 없는 오류'
		return (
			<main className="p-6">
				<p>데이터 로드 중 오류가 발생했습니다.</p>
				<p className="text-sm text-red-500">{errorMessage}</p>
				<button
					className="mt-2 px-3 py-1 bg-teal-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={() => refetch()}
					disabled={Boolean(isFetching)}
				>
					{isFetching ? '다시 시도 중...' : '다시 시도'}
				</button>
			</main>
		)
	}

	return (
		<div className="p-6">
			<h2 className="text-2xl font-semibold mb-4">갤러리</h2>
			{isFiltered && (
				<p className="mb-4 text-gray-600">
					행사 날짜: {rentalStart} ~ {rentalEnd} (필터링됨)
				</p>
			)}
			{isFetching && !isLoading && <p className="text-sm text-gray-400 mb-2">업데이트 중...</p>}

			{!items.length ? (
				<div className="text-center py-12">
					<p className="text-gray-500">
						{isFiltered ? '해당 날짜에 대여 가능한 상품이 없습니다.' : '먼저 행사 날짜를 선택해주세요.'}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
					{items.map(item => {
						const imageUrl = item.display_code
							? `https://storage.googleapis.com/hanbok.bdanbonga.com/Store/[${item.display_code}]/1.jpg`
							: null

						// const nameParts = [item.hanbok_name1, item.hanbok_name2, item.hanbok_name3].filter(Boolean)
						// const mainName = nameParts.join(' ')

						return (
							<div key={item.display_code} className="group">
								{/* Image container with relative positioning for the overlay */}
								<div className="relative w-full cursor-pointer">
									{/* 한복 이미지 카드 */}
									{imageUrl && (
										<img
											src={imageUrl}
											alt={item.display_code || ''}
											className="aspect-auto w-full object-cover rounded-md 
												transition-opacity bg-gray-100 group-hover:opacity-90"
										/>
									)}

									{/* Unavailable Overlay */}
									{item.unavailable && (
										<div className="absolute inset-0 bg-black/60 rounded-md flex items-center justify-center p-4 text-center">
											<p className="text-white text-sm font-medium">
												이 상품은 해당 날짜에 대여가 어렵습니다
											</p>
										</div>
									)}
								</div>

								{/* Product Info */}
								<div className="mt-2">
									<div className="flex flex-col items-start justify-between text-sm">
										{item.display_code && (
											<span className="text-gray-400 font-mono">{item.display_code}</span>
										)}
										{item.customer_type && (
											<span className="inline-block bg-gray-100 text-blackd px-2 py-1 rounded-full">
												{item.customer_type}
											</span>
										)}
									</div>
									
									<h3 className="mt-2 text-sm font-semibold text-gray-800 truncate group-hover:text-teal-600">
										{item.hanbok_name1}
									</h3>
									
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
