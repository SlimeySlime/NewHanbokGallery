

- [x] `src/config/apiConfig.ts` 파일 생성 및 API 엔드포인트 상수 정의
- [x] `src/context/EventDateContext.tsx` 파일 생성 (행사 날짜 공유 Context)
- [x] `src/hooks/useFilteredGallery.ts` 파일 생성 (필터링된 갤러리 데이터 훅)
- [x] `src/components/TopNav.tsx` 파일 생성 및 날짜 필터 UI 구현
- [x] `src/App.tsx`에 `EventDateProvider` 적용
- [x] `src/pages/Gallery.tsx`에서 `EventDateContext`를 사용하여 조건부 데이터 로딩 구현
- [x] `useGallery` 훅이 `enabled` 옵션을 받도록 수정하고 API 엔드포인트 오류 수정
- [x] `domain` 폴더에 `GalleryItem` 타입 정의 추가


- app.css, index.css 모두 컴포넌트 tsx파일에 tailwind로 적용 


# 사용자 메모
- unavailable 이 django 서버에서 계산되므로,
    gallery/filter/?reatalStart&reantalEnd 에서 받는 타입도 GalleryItem 임
