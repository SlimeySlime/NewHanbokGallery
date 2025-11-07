import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAllGalleryItemsQuery } from '../store/api/galleryApi';
import GalleryGrid from '../components/GalleryGrid';
import GallerySkeleton from '../components/GallerySkeleton';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const {
    data: allItems = [],
    isLoading,
    isError,
    error,
  } = useGetAllGalleryItemsQuery();

  const searchResults = useMemo(() => {
    if (!query) return [];
    return allItems.filter(item => {
      const searchTerm = query.toLowerCase();
      return (
        item.hanbok_name1?.toLowerCase().includes(searchTerm) ||
        item.hanbok_name2?.toLowerCase().includes(searchTerm) ||
        item.hanbok_name3?.toLowerCase().includes(searchTerm) ||
        item.display_code?.toLowerCase().includes(searchTerm)
      );
    });
  }, [allItems, query]);

  if (isLoading) {
    return (
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-semibold mb-4">'{query}' 검색 중...</h2>
        <GallerySkeleton />
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      (error && typeof error === 'object' && 'error' in error ? String(error.error) : String(error)) ||
      '알 수 없는 오류';
    return (
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">검색 오류</h2>
        <p>데이터 로드 중 오류가 발생했습니다.</p>
        <p className="text-sm text-red-500">{errorMessage}</p>
      </main>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        '{query}'에 대한 검색 결과
      </h2>
      <p className="mb-4 text-gray-600">
        총 {searchResults.length}개의 상품을 찾았습니다.
      </p>

      {!searchResults.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <GalleryGrid items={searchResults} />
      )}
    </div>
  );
}
