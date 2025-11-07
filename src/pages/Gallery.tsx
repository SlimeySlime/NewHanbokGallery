import React from 'react';
import { useAppSelector } from '../store/hooks';
import { useGetFilteredGalleryQuery } from '../store/api/galleryApi';
import GallerySkeleton from '../components/GallerySkeleton';
import { CustomerType } from '../domain/gallery_item';
import GalleryGrid from '../components/GalleryGrid';

interface GalleryProps {
  customer_type?: CustomerType;
}

export default function Gallery({ customer_type }: GalleryProps) {
  const { rentalStart, rentalEnd } = useAppSelector(state => state.eventDate);
  const isFiltered = !!rentalStart && !!rentalEnd;

  const {
    data: items = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetFilteredGalleryQuery(
    { rentalStart, rentalEnd },
    { skip: !isFiltered }
  );

  const filteredItems =
    customer_type && customer_type !== '전체'
      ? items.filter(item =>
          item.customer_type
            ?.split(',')
            .map(s => s.trim())
            .includes(customer_type),
        )
      : items;

  const title = customer_type ? `${customer_type} 한복` : '갤러리';

  if (isLoading) {
    return (
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
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
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {isFiltered && (
        <p className="mb-4 text-gray-600">
          행사 날짜: {rentalStart} ~ {rentalEnd} (필터링됨)
        </p>
      )}
      {isFetching && !isLoading && <p className="text-sm text-gray-400 mb-2">업데이트 중...</p>}

      {!filteredItems.length ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {isFiltered ? '해당 날짜에 대여 가능한 상품이 없습니다.' : '먼저 행사 날짜를 선택해주세요.'}
          </p>
        </div>
      ) : (
        <GalleryGrid items={filteredItems} />
      )}
    </div>
  );
}
