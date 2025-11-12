import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGalleryItemByDisplayCodeQuery } from '../store/api/galleryApi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Display: React.FC = () => {
  const { displayCode } = useParams<{ displayCode: string }>();
  const { data: item, error, isLoading } = useGetGalleryItemByDisplayCodeQuery(displayCode!);

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [validImageUrls, setValidImageUrls] = useState<string[]>([]);

  const getDisplaySizes = (availableSize: string | undefined | null): string => {
    if (!availableSize) {
      return '문의';
    }

    const STANDARD_SIZES = [44, 55, 66, 77, 88, 99];
    const availableSizes = availableSize.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

    if (availableSizes.length === 0) {
      return '문의';
    }

    const minSize = Math.min(...availableSizes);
    const minSizeIndex = STANDARD_SIZES.indexOf(minSize);

    let finalSizes = new Set(availableSizes);

    if (minSizeIndex > 0) {
      finalSizes.add(STANDARD_SIZES[minSizeIndex - 1]);
    }

    return Array.from(finalSizes).sort((a, b) => a - b).join(', ');
  };

  useEffect(() => {
    if (item) {
      const imageUrls = Array.from(
        { length: 20 },(_, i) =>
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
      // gemini created. should check 
      Promise.allSettled(imageUrls.map(checkImage)).then(results => {
        const loadedUrls = results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<string>).value);
        setValidImageUrls(loadedUrls);
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

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Image Gallery */}
        <div>
          {/* Main Swiper */}
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 mb-4"
          >
            {validImageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`${item.display_code} main ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbs Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {validImageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`${item.display_code} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-75"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 한복 상세 설명 */}
        <div id='item-details' className="flex flex-col text-start font-">
          <div className="m-4 mb-12 w-auto">
            <div className="mb-12 p-4">
              <p className="pt-4 text-2xl border-b-2 pb-4">[{item.display_code}] {item.hanbok_name1}</p>
              {[item.hanbok_name2, item.hanbok_name3, item.hanbok_name4, item.hanbok_name5]
                .filter(Boolean)
                .map((name, index) => (
                  <p key={index} className="pt-4 text-2xl">구성품 {index + 1}: {name}</p>
                ))
              }
              <p className="pt-4 text-2xl">사이즈: {getDisplaySizes(item.available_size)}</p>
            </div>
            <div className="font-sans">
              <p className="flex mb-4 font-semibold text-lg">👩 저고리와 치마를 종류별로 다르게 선택해서 결정하실수도 있습니다. <br/>예 ) A008 저고리, A029 치마</p>
              <p className="flex mb-4 font-semibold text-lg">🧵 정확하게 맞는 치수가 아니더라도 <br/>고객님의 키, 가슴둘레, 화장길이에 맞춰서 수선해드릴 수 있습니다.</p>
            </div>
          </div>
        </div>


      </div>
      <div id='rental-process' className="mt-16 border-t pt-8 font-bold">
        <h2 className="text-2xl font-bold text-center mb-8">대여 절차</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 p-4 rounded-full bg-teal-700 text-white flex flex-col justify-center items-center">
              <p className=" text-xl">1. 한복 선택</p>
              <img src="/img/hanbok.png" className="h-24 mt-2" alt="한복 아이콘" />
            </div>
            <p className="mt-4 ">한복 디자인을 선택해주세요</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 p-4 rounded-full bg-pink-400 text-white flex flex-col justify-center items-center">
              <p className=" text-xl">2. 문의 상담</p>
              <img src="/img/chat-white.png" className="h-24 mt-2" alt="상담 아이콘" />
            </div>
            <p className="mt-4 ">
              대여 가능 여부, <br /> 사이즈를 확인해주세요 <br />
              (전화 043 - 234 - 5165)
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 p-4 rounded-full bg-teal-700 text-white flex flex-col justify-center items-center">
              <p className=" text-xl">3. 한복 배송</p>
              <img src="/img/truck.png" className="h-24 mt-2" alt="배송 아이콘" />
            </div>
            <p className="mt-4 ">행사일로부터 3일 전 발송</p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 p-4 rounded-full bg-pink-400 text-white flex flex-col justify-center items-center">
              <p className=" text-xl">4. 한복 반납</p>
              <img src="/img/delivery-van-white.png" className="h-24 mt-2" alt="반납 아이콘" />
            </div>
            <p className="mt-4 ">행사 다음 날 택배반납 (자동예약)</p>
          </div>
        </div>
      </div>

      <div id="reservation-terms" className="mt-16 mx-16 border-t pt-8 text-left font-bold">
        <h2 className="text-2xl font-bold mb-8">예약 전 필독사항</h2>
        <div>
          <h3 className="text-xl  mt-6 mb-2">※ 주문시</h3>
          <ul className="space-y-1 text-gray-700">
            <li>- 대여기간 : 2박 3일</li>
            <li>- 사이즈(키, 가슴둘레, 화장, 신발사이즈)를 알려주세요.</li>
            <li>- 치마길이와 신발높이는 키를 기준으로 준비해드립니다. (신발 높이를 원하시면 요청해주세요)</li>
            <li>- 주말행사 : 수요일 택배 출고로 목요일 또는 금요일에 도착합니다.</li>
            <li>- 평일행사 : 행사 3일전 택배가 출발합니다.</li>
            <li>- 행사일자에 대여가 가능한지 문의해서 한번 더 확인해주세요.</li>
          </ul>

          <h3 className="text-xl  mt-6 mb-2">※ 반납시</h3>
          <ul className="space-y-1 text-gray-700">
            <li>행사 다음날 방문 수거가 자동으로 접수됩니다</li>
            <li>주말행사 : 월요일에 방문 수거가 자동으로 접수됩니다</li>
            <li>평일 : 행사 다음 날에 방문 수거가 자동으로 접수됩니다</li>
            <li>한복과 구성품을 상자에 담아서, 보내드린 택배박스에 넣어주세요</li>
            <li>택배 기사님 전화를 꼭 받아주세요</li>
            <li>고객님 사정으로 반납이 연체 될 경우 연체료가 부과될 수 있습니다</li>
          </ul>

          <h3 className="text-xl  mt-6 mb-2">※ 대여박스 구성품</h3>
          <ul className="space-y-1 text-gray-700">
            <li>한복, 속바지, 버선, 속치마, 노리개, 뒤꽂이(올림머리 선택시), 브로치, 신발, 가방</li>
            <li>저고리의 자수에 따라 브로치 여부가 결정됩니다. (자수가 있는 경우 별도로 넣어드리지 않습니다)</li>
          </ul>

          <h3 className="text-xl  mt-6 mb-2">※ 참고사항</h3>
          <ul className="space-y-1 text-gray-700">
            <li>대여 소품은 사진과 다를 수 있으며, 선택하신 한복과 어울리는 것으로 보내드립니다.</li>
            <li>신발 높이는 치마길이와 키에 따라서 1cm, 3cm, 7cm, 11cm로 조정됩니다.</li>
            <li>모니터와 모바일의 색상과 조명에 따라 한복 색상에 차이가 날 수 있습니다.</li>
          </ul>

          <h3 className="text-xl  mt-6 mb-2">※ 취소, 교환, 환불안내</h3>
          <ul className="space-y-1 text-gray-700">
            <li>상품을 주문하시면 행사일에 맞춰 대여를 확정하기때문에 해당 한복을 다른 고객님의 예약을 못 받는 상태이므로 환불이 어렵습니다.</li>
            <li>대여 예약금은 대여비의 50% 이상입니다.</li>
            <li>계약 취소시에는 대여비의 50% 를 환불해드립니다.</li>
            <li>행사 1주전에는 환불 불가</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-16 border-t pt-8">
        <div className="flex flex-col items-center space-y-8">
          {validImageUrls.map((url, index) => (
            <img
              key={index}
              src={url} alt={`${item.display_code} 상세 이미지 ${index + 1}`}
              className="max-w-full h-auto rounded-lg shadow-lg  my-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Display;