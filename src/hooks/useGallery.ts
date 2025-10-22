import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { GALLERY_ENDPOINTS } from '../config/apiConfig'
import type { GalleryItem } from '../domain/gallery_item'

// axios 인스턴스 (기본 설정)
const api = axios.create({
	baseURL: GALLERY_ENDPOINTS.GALLERY_ITEMS,
	timeout: 10000,
})

// gallery 전체를 가져오는 유틸
async function fetchGallery(): Promise<GalleryItem[]> {
	const res = await api.get('') // baseURL already points to gallery endpoint
	console.log(`axios get.${GALLERY_ENDPOINTS.GALLERY_ITEMS}`, res.data)
	return res.data
}

// React Query 훅 (v5 object form 사용)
export function useGallery(enabled: boolean = true) {
	return useQuery<GalleryItem[], Error>({
		queryKey: ['gallery'],
		queryFn: fetchGallery,
		staleTime: 1000 * 60 * 5, // 5분
		refetchOnWindowFocus: false,
		retry: 1,
		enabled,
	})
}
