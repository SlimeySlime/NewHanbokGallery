import React from 'react'
import { useGallery } from '../hooks/useGallery'

export default function Gallery() {
	const { data, isLoading, isError, error, refetch } = useGallery()

	if (isLoading) {
		return (
			<main className="p-6">
				<p>로딩 중...</p>
			</main>
		)
	}

	if (isError) {
		return (
			<main className="p-6">
				<p>데이터 로드 중 오류가 발생했습니다.</p>
				<p className="text-sm text-red-500">{String(error)}</p>
				<button className="mt-2 px-3 py-1 bg-teal-600 text-white rounded" onClick={() => refetch()}>
					다시 시도
				</button>
			</main>
		)
	}

	// data가 배열 형태라고 가정
	return (
		<main className="p-6">
			<h2 className="text-2xl font-semibold mb-4">갤러리</h2>

			{!data || data.length === 0 ? (
				<p>항목이 없습니다.</p>
			) : (
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="border-b">
							<th className="py-2">ID</th>
							<th className="py-2">날짜</th>
							<th className="py-2">구분</th>
							<th className="py-2">고객유형</th>
							<th className="py-2">코드</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: any) => (
							<tr key={item.id} className="odd:bg-white/5">
								<td className="py-2 align-top">{item.id}</td>
								<td className="py-2 align-top">{item.date}</td>
								<td className="py-2 align-top">{item.gubun ?? '-'}</td>
								<td className="py-2 align-top">{item.customer_type ?? '-'}</td>
								<td className="py-2 align-top">{item.display_code ?? '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</main>
	)
}
