import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGalleryItemByDisplayCodeQuery } from '../store/api/galleryApi';

const Display: React.FC = () => {
  const { displayCode } = useParams<{ displayCode: string }>();
  const { data: item, error, isLoading } = useGetGalleryItemByDisplayCodeQuery(displayCode!);

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [validImageUrls, setValidImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (item) {
      const imageUrls = Array.from(
        { length: 20 },
        (_, i) =>
          `https://storage.googleapis.com/hanbok.bdanbonga.com/Store/[${item.display_code}]/${i + 1}.jpg`
      );

      const checkImage = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject();
          img.src = url;
        });
      };

      Promise.allSettled(imageUrls.map(checkImage)).then(results => {
        const loadedUrls = results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<string>).value);
        setValidImageUrls(loadedUrls);
        if (loadedUrls.length > 0) {
          setMainImage(loadedUrls[0]);
        }
      });
    }
  }, [item]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading item.</div>;
  }

  if (!item) {
    return <div>Item not found.</div>;
  }

  const handleThumbnailClick = (url: string) => {
    setMainImage(url);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            {mainImage && (
              <img
                src={mainImage}
                alt={item.display_code}
                className="w-full object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {validImageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${item.display_code} thumbnail ${index + 1}`}
                className="w-full object-cover rounded-md cursor-pointer hover:opacity-75"
                onClick={() => handleThumbnailClick(url)}
              />
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.hanbok_name1}</h1>
          <p className="text-lg text-gray-600 mb-4">{item.display_code}</p>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">구성품</h2>
            <ul>
              {item.hanbok_name1 && <li>{item.hanbok_name1}</li>}
              {item.hanbok_name2 && <li>{item.hanbok_name2}</li>}
              {item.hanbok_name3 && <li>{item.hanbok_name3}</li>}
            </ul>
          </div>

          <div className="mt-4 border-t pt-4">
            <p>
              <span className="font-semibold">구분:</span> {item.customer_type}
            </p>
            {/* Add more details as needed */}
          </div>

          <div className="mt-6">
            <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">
              대여하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;