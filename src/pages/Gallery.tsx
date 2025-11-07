import React from 'react';
import { useAppSelector } from '../store/hooks';
import { useGetFilteredGalleryQuery } from '../store/api/galleryApi';
import GallerySkeleton from '../components/GallerySkeleton';
import { type GalleryItem, CustomerType } from '../domain/gallery_item';

interface GalleryProps {
  customer_type: CustomerType;
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
          item.customer_type.split(',').includes(customer_type),
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
          {filteredItems.map(item => {
            const imageUrl = `https://storage.googleapis.com/hanbok.bdanbonga.com/Store/[${item.display_code}]/1.jpg`;

            return (
              <div key={item.display_code} className="p-3 group cursor-pointer transition-shadow hover:shadow-lg rounded-md">
                <div className="relative w-full">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={item.display_code || ''}
                      className="aspect-auto w-full object-cover rounded-md 
                        transition-opacity bg-gray-100 group-hover:opacity-90"
                    />
                  )}

                  {item.unavailable && (
                    <div className="absolute inset-0 cursor-not-allowed 
                      bg-black/60 rounded-md flex items-center justify-center p-4 text-center">
                      <p className="text-white text-sm font-medium">
                        이 상품은 해당 날짜에 대여가 어렵습니다
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start justify-between text-sm">
                  <span className="mt-2 text-gray-800 bg-gray-200 font-mono px-2 py-1 rounded-full">
                    {item.display_code}
                  </span>
                  <span className="hiddenn bg-gray-100 text-blackd px-2 py-1 rounded-full">
                    {item.customer_type} hidden in build version 
                  </span>
                  <span className="mt-2 font-semibold text-gray-800 truncate group-hover:text-teal-600">
                    {item.hanbok_name1}
                  </span>
                  <span className="mt-2 font-semibold text-gray-800 truncate group-hover:text-teal-600">
                    {item.hanbok_name2}
                  </span>
                  <span className="mt-2 font-semibold text-gray-800 truncate group-hover:text-teal-600">
                    {item.hanbok_name3}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
