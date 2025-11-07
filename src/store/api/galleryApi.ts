import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GalleryItem } from '../../domain/gallery_item'
import { GALLERY_ENDPOINTS } from '../../config/apiConfig'

interface FilteredGalleryParams {
	rentalStart: string | null
	rentalEnd: string | null
}


export const galleryApi = createApi({
	// 리듀서 경로: 스토어에서 이 API 슬라이스를 식별하는 고유한 키
	reducerPath: 'galleryApi',
	// 기본 쿼리 설정: 모든 요청에 사용될 기본 fetch 함수
	baseQuery: fetchBaseQuery({ baseUrl: GALLERY_ENDPOINTS.BASE }),

	endpoints: builder => ({
		// `getFilteredGallery`라는 이름의 쿼리 엔드포인트를 생성
		getFilteredGallery: builder.query<GalleryItem[], FilteredGalleryParams>({
			query: ({ rentalStart, rentalEnd }) => ({
				url: 'filter/',
				params: { rentalStart, rentalEnd },
			}),
		}),
	}),
})

// createApi가 자동으로 생성해주는 커스텀 훅을 export 합니다.
// 컨벤션: `use` + Endpoint이름 + `Query`/`Mutation`
// e.g.) `useGetFilteredGalleryQuery`
export const { useGetFilteredGalleryQuery } = galleryApi
