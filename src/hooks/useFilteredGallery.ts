import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GALLERY_ENDPOINTS } from '../config/apiConfig';
import type { GalleryItem } from '../domain/gallery_item';

interface FilteredGalleryParams {
  rentalStart: string | null;
  rentalEnd: string | null;
}

// axios 인스턴스 생성
const api = axios.create({
  baseURL: GALLERY_ENDPOINTS.GALLERY_FILTER,
  timeout: 10000,
});

// e.g) https://slimeyslime.net/api/gallery/filter/?rentalStart=20251006&rentalEnd=20251019
async function fetchFilteredGallery({ rentalStart, rentalEnd }: FilteredGalleryParams): Promise<GalleryItem[]> {
  if (!rentalStart || !rentalEnd) {
    return [];
  }
  const res = await api.get('', { params: { rentalStart, rentalEnd } });
  console.log(`axios get.${GALLERY_ENDPOINTS.GALLERY_FILTER}`, res.data);
  return res.data;
}

export function useFilteredGallery(params: FilteredGalleryParams) {
  const { rentalStart, rentalEnd } = params;

  return useQuery<GalleryItem[], Error>({
    queryKey: ['gallery', 'filtered', rentalStart, rentalEnd],
    queryFn: () => fetchFilteredGallery({ rentalStart, rentalEnd }),
    enabled: !!rentalStart && !!rentalEnd, // 두 날짜가 모두 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
