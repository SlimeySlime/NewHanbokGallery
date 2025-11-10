// import React from 'react';
import { Link } from 'react-router-dom';
import { type GalleryItem } from '../domain/gallery_item';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
      {items.map(item => {
        const imageUrl = `https://storage.googleapis.com/hanbok.bdanbonga.com/Store/[${item.display_code}]/1.jpg`;

        return (
          <Link
            to={`/display/${item.display_code}`}
            key={item.display_code}
            className="p-4 group cursor-pointer transition-shadow hover:shadow-lg rounded-md"
          >
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
                <div
                  className="absolute inset-0 cursor-not-allowed 
                  bg-black/60 rounded-md flex items-center justify-center p-4 text-center"
                >
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
              <span className="hidden bg-gray-100 text-blackd px-2 py-1 rounded-full">
                {item.customer_type} hidden for now.
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
          </Link>
        );
      })}
    </div>
  );
}
