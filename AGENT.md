# AGENT Notes — bdanbonga
# 기본 매뉴얼
- 수정사항을 코드로 만들면, 연관된 프로젝트 파일을 모두 검토해서 에러가 없도록 꼼꼼히 검토한후 수정사항을 제시합니다.


# 지시사항
- `TopNav`에서 행사 날짜 변경 시 `react-query`를 사용하여 `GALLERY_FILTER_API`에서 정보를 가져오도록 구현합니다.
- `useGallery.ts`의 모듈 import 에러를 수정하고, 전체적인 코드 일관성을 검토하여 수정합니다.
- 프로젝트 전반에 걸쳐 일관된 코드 스타일(axios 사용, 일반 함수 선언 등)을 유지합니다.
- `Home.tsx` 파일의 들여쓰기를 일관성 있게 조정합니다.

# 프로젝트 요약

## 1. 개요
이 프로젝트는 한복 대여점("비단본가"로 추정)의 웹사이트로, 사용자가 다양한 한복 상품을 둘러보고, 특정 날짜에 대여 가능한 상품을 필터링하며, 개별 상품의 상세 정보를 확인할 수 있는 기능을 제공합니다.

## 2. 기술 스택
- **프레임워크**: React (v19), Vite
- **언어**: TypeScript
- **상태 관리**:
  - **RTK Query**: 서버 상태 관리 (데이터 페칭, 캐싱). `src/store/api/galleryApi.ts`에 정의됨.
  - **Redux Toolkit**: 클라이언트 상태 관리. 현재 `eventDate`(선택된 행사 날짜) 관리에 사용됨.
  - **TanStack React Query**: `App.tsx`에 `QueryClientProvider`가 설정되어 있으나, 현재 주요 데이터 페칭은 RTK Query를 통해 이루어지고 있습니다. (과거 `useContext`에서 마이그레이션된 흔적으로 보임)
- **라우팅**: `react-router-dom` (v7)
- **HTTP 클라이언트**: `axios` (RTK Query의 `fetchBaseQuery` 내부에서 사용될 수 있음)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Swiper.js (상품 상세 페이지 `Display.tsx`에서 사용)

## 3. 아키텍처 및 주요 로직
- **전역 상태**:
  - `App.tsx`에서 Redux(`Provider`)와 React Query(`QueryClientProvider`)의 Provider를 설정합니다.
  - `AppInitializer` 컴포넌트가 앱 실행 시 쿠키(`eventDate`)를 읽어와 Redux store의 `eventDate` 상태를 초기화합니다.
- **API 통신**:
  - RTK Query를 사용하여 API 엔드포인트를 정의하고, 관련 훅(`use...Query`)을 생성하여 컴포넌트에서 사용합니다. (`src/store/api/galleryApi.ts`)
  - 주요 API: 전체 갤러리 아이템 조회, 날짜 필터링 조회, 특정 아이템 상세 조회.
- **라우팅**:
  - `src/Router.tsx`에서 모든 페이지 라우트를 관리합니다.
  - `AppLayout` 컴포넌트를 통해 `TopNav`와 `Footer`가 모든 페이지에 공통으로 적용됩니다.
  - 고객 타입(`신부`, `신랑` 등)에 따라 동일한 `Gallery` 컴포넌트를 재사용하며, `customer_type` prop을 전달합니다.

## 4. 주요 파일 구조
- `src/main.tsx`: 앱 진입점
- `src/App.tsx`: 전역 Provider(Redux, React Query) 설정 및 상태 초기화
- `src/Router.tsx`: 페이지 라우팅 구조 정의
- `src/components/`: 재사용 가능한 UI 컴포넌트 (TopNav, Footer, GalleryGrid 등)
- `src/pages/`: 각 페이지 컴포넌트 (Home, Gallery, Display 등)
- `src/store/`: Redux Toolkit 관련 파일
  - `index.ts`: Redux 스토어 설정
  - `slices/`: 일반 클라이언트 상태 슬라이스 (`eventDateSlice.ts`)
  - `api/`: RTK Query API 슬라이스 (`galleryApi.ts`)
- `src/hooks/`: 커스텀 훅 (현재는 비어있거나 과거의 잔재로 보임)
- `src/domain/`: TypeScript 타입 정의
- `src/utils/`: 유틸리티 함수 (쿠키, 날짜 포맷 등)
- `src/config/`: API 설정 (`apiConfig.ts`)