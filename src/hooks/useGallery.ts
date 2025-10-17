import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { GALLERY_API } from '../config/apiConfig'

// axios 인스턴스 (기본 설정)
const api = axios.create({
	baseURL: GALLERY_API,
	timeout: 10000,
})

// gallery 전체를 가져오는 유틸
async function fetchGallery() {
	const res = await api.get('')
    console.log('useGallery fetch', res.data)
	return res.data
}

// React Query 훅 (v5 object form 사용)
export function useGallery() {
	return useQuery({
		queryKey: ['gallery'],
		queryFn: fetchGallery,
		staleTime: 1000 * 60 * 5, // 5분
		// cacheTime: 1000 * 60 * 60,
		refetchOnWindowFocus: false,
		retry: 1,
	})
}
