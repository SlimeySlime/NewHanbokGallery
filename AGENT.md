# AGENT Notes — bdanbonga
# 기본 매뉴얼
- 수정사항을 코드로 만들면, 연관된 프로젝트 파일을 모두 검토해서 에러가 없도록 꼼꼼히 검토한후 수정사항을 제시합니다.


# 지시사항
- `TopNav`에서 행사 날짜 변경 시 `react-query`를 사용하여 `GALLERY_FILTER_API`에서 정보를 가져오도록 구현합니다.
- `useGallery.ts`의 모듈 import 에러를 수정하고, 전체적인 코드 일관성을 검토하여 수정합니다.
- 프로젝트 전반에 걸쳐 일관된 코드 스타일(axios 사용, 일반 함수 선언 등)을 유지합니다.

# 요약
- **코드 스타일 통일**: 프로젝트의 데이터 fetching 훅(`useGallery`, `useFilteredGallery`)의 코드 스타일을 `axios` 사용 및 일반 함수 선언 방식으로 통일하여 일관성을 높였습니다.
- **에러 수정**: `src/hooks/useGallery.ts`에서 `GALLERY_API` 대신 `GALLERY_ENDPOINTS.GALLERY_ITEMS`를 사용하도록 수정하여 모듈 import 에러를 해결했습니다. 또한 `enabled` 옵션을 추가하여 쿼리를 조건부로 실행할 수 있도록 개선했습니다.
- **상태 관리**: `src/context/EventDateContext.tsx`를 생성하여 `TopNav`와 `Gallery` 간에 행사 날짜를 공유합니다.
- **데이터 Fetching**: `src/hooks/useFilteredGallery.ts` 훅을 추가하여 날짜로 필터링된 갤러리 데이터를 가져옵니다.
- **UI 업데이트**:
    - `src/components/TopNav.tsx`를 생성하여 날짜 선택 UI와 컨텍스트 업데이트 로직을 구현했습니다.
    - `src/pages/Gallery.tsx`를 수정하여 날짜 필터 유무에 따라 `useGallery` 또는 `useFilteredGallery`를 조건부로 사용하고, 두 종류의 데이터 구조를 모두 렌더링할 수 있도록 개선했습니다.
- **앱 구조**: `App.tsx`에 `EventDateProvider`를 추가하여 컨텍스트를 앱 전체에 제공합니다.
- **타입 정의**: `src/domain/gallery_item.ts`를 생성하여 `GalleryItem` 타입을 명확히 정의했습니다.

# 사용스택
- axios + ReactQuery



