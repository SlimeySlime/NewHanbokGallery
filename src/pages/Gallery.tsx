import React from 'react'
import { useFilteredGallery } from '../hooks/useFilteredGallery'
import { useEventDate } from '../hooks/useEventDate'
import type { GalleryItem } from '../domain/gallery_item'

export default function Gallery() {
	const { rentalStart, rentalEnd } = useEventDate()
	const isFiltered = !!rentalStart && !!rentalEnd

	const {
		data: items,
		isLoading,
		isError,
		error,
		refetch,
		isFetching,
	} = useFilteredGallery({ rentalStart, rentalEnd })

	if (isLoading) {
		return (
			<main className="p-6">
				<p>로딩 중...</p>
			</main>
		)
	}

	if (isError) {
		const errorMessage = error instanceof Error ? error.message : String(error ?? '알 수 없는 오류')
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
		<div className="px-6 pb-6">
			<h2 className="text-2xl font-semibold mb-4">갤러리 디버그 페이지</h2>
			{isFiltered && (
				<p className="mb-4 text-gray-600">
					행사 날짜: {rentalStart} ~ {rentalEnd} (필터링됨)
				</p>
			)}
			{isFetching && !isLoading && <p className="text-sm text-gray-400 mb-2">업데이트 중...</p>}

			{!items.length ? (
				<p>항목이 없습니다.</p>
			) : (
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="border-b">
							<th className="py-2">유형</th>
							<th className="py-2">코드</th>
							<th className="py-2">이름</th>
							<th className="py-2">타입</th>
							<th className="py-2">사이즈</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item, idx) => {
							const key = `row-${idx}`
							return (
								<tr key={String(key)} className="odd:bg-white/5">
									<td className="py-2 align-top">{item.customer_type ?? '-'}</td>
									<td className="py-2 align-top">{item.display_code ?? '-'}</td>
									<td className="py-2 align-top">{item.hanbok_name1 ?? '-'}</td>
									<td className="py-2 align-top">{item.hanbok_type1 ?? '-'}</td>
									<td className="py-2 align-top">{item.available_size ?? '-'}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</div>
	)
}
