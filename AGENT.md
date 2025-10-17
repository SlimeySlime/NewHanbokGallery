# AGENT Notes — bdanbonga

요약
- TopNav: 화면 상단에 고정(fixed)된 네비게이션. 필요하면 `sticky top-0`로 변경 가능.
- Logo: `src/assets/bdanbonga.svg?react`를 SVG 컴포넌트로 사용(청록 원 + 흰 B). 교체는 해당 파일 덮어쓰기 또는 import 경로 변경.
- Hero: 배경 이미지 `public/mainhanbok.png` 사용. 오버레이는 전체(inset-0)로 적용, 텍스트 컨테이너는 왼쪽 50%만 차지하도록 설정됨.
- Search form: semantic form 구조(role="search"), Tailwind로 스타일링(반투명, 둥근 모서리). 입력은 `form-control` 스타일 유틸로 처리.

핵심 결정 및 권장
1. fixed vs sticky
   - fixed: 뷰포트에 항상 고정(현재 적용). 본문 상단에 네비가 겹치므로 본문(예: Hero 상단)에 `padding-top` 또는 컨테이너 마진 조정 권장.
   - sticky: 문서 흐름을 유지하면서 스크롤 시 상단에 붙음. 레이아웃 밀림 보정 불필요한 경우 권장.

2. 자산 위치(public vs src/assets)
   - public: 빌드 시 그대로 복사되어 고정 경로로 서빙. index.html에서 직접 참조하거나 루트 경로가 필요한 파일에 사용.
   - src/assets: 번들러(Vite)가 처리(임포트/해싱/최적화). React 컴포넌트에서 직접 import 하여 사용하기에 적합.
   - 권장 규칙: 컴포넌트에서 import하는 이미지/아이콘 → `src/assets`. 루트에 고정적으로 서빙할 파일 → `public`.

3. 로고
   - 현재: `import BdanbongaLogo from '../assets/bdanbonga.svg?react'` (SVG를 React 컴포넌트로 사용)
   - 교체: `src/assets/bdanbonga.svg` 덮어쓰기 또는 import 경로 변경 (`?react` 옵션을 유지하면 컴포넌트 사용 가능).

4. Hero 섹션
   - 배경: `background-image: url('/mainhanbok.png')` (public 경로)
   - 오버레이: 전체 화면을 덮는 오버레이(div.absolute.inset-0.bg-black/10) + 텍스트 컨테이너(`#main_text`)는 왼쪽 50%(`left-0 w-1/2`)로 중앙 정렬.

5. 검색폼 (현재 마크업)
   - 구조:
     ```html
     <form class="search ... " role="search" id="search">
       <i class="bi bi-search">🔍</i>
       <input id="search-query" type="search" placeholder="검색" autocomplete="off" aria-label="검색" />
     </form>
     ```
   - 권장 Tailwind 클래스:
     - form: `flex items-center bg-white/10 hover:bg-white/20 rounded-md px-2 py-1 transition-colors duration-150 ease-in-out`
     - input: `bg-transparent placeholder-white/70 text-white text-sm w-32 md:w-48 focus:outline-none focus:ring-2 focus:ring-teal-400`
   - 접근성: `role="search"`, `aria-label` 유지.

## 추가: 행사날짜(캘린더) 관련
- TopNav에 '행사날짜' 레이블 + input[type="date"]를 추가하여 간단한 캘린더 선택 UI를 제공함.
- 구현 방식: 부모 컨테이너에 `hidden md:flex` 같은 responsive 유틸을 적용하면 해당 컨테이너 내부의 모든 자식을 한 번에 숨김/표시 가능.
- 권장: 모바일에서 UI 요소를 일일이 숨기는 대신 관련 요소를 그룹화하고 부모에 responsive 클래스를 적용하면 관리가 쉬움.

## 모바일 숨김 자동화에 대한 메모
- 개별 자식에 `mobile:hidden`을 반복 적용할 필요 없음. 부모 컨테이너에 `hidden md:flex` 또는 CSS 미디어쿼리로 한 번에 제어하세요.
- 컴포넌트화(예: <TopNavControls />)하면 responsive 동작을 한 곳에서 관리할 수 있어 자동화/유지보수성이 높아집니다.

사용 예시 (App)
- App.tsx에서 현재 사용:
  ```tsx
  <TopNav />
  <Hero />
  <main>...content...</main>
  <Footer />
  ```
- fixed nav 사용 시 main이나 Hero 상단에 `pt-16` 같은 보정 추가 권장 (네비 높이만큼).

교체/관리 팁
- 이미지를 교체하려면:
  - `src/assets/bdanbonga.svg` 교체 → TopNav에 자동 반영
  - `public/mainhanbok.png` 교체 → Hero 배경 자동 반영
- SVG를 컴포넌트로 사용하려면 Vite의 SVG 플러그인 또는 `?react` import를 사용(현재 구성 사용).

간단 체크리스트
- [ ] 네비 고정 유형(fixed/sticky) 확정
- [ ] fixed 사용 시 상단 오프셋 보정 (App/main)
- [ ] 이미지 최종 파일(logo, mainhanbok) 위치/이름 확정
- [ ] Tailwind focus/transition 클래스 적용 여부 검토

끝.
