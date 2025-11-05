import { useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query'

/**
 * React Query의 캐시를 클라이언트 상태 저장소로 사용하는 제네릭 커스텀 훅.
 * React의 `useState`와 유사한 인터페이스를 제공합니다. `[state, setState]`
 *
 * @param queryKey 상태를 식별하기 위한 고유한 키
 * @param initialData 상태의 초기값
 * @returns `[state, setState]` 튜플
 */
export function useQueryState<T>(queryKey: QueryKey, initialData: T) {
	const queryClient = useQueryClient()

	const { data } = useQuery({
		queryKey,
		// 초기 데이터 설정. 캐시에 데이터가 있으면 이 함수는 실행되지 않음.
		initialData,
		// 클라이언트 상태는 'stale' 개념이 없으므로 Infinity로 설정
		staleTime: Infinity,
		// 가비지 컬렉션 방지
		gcTime: Infinity,
	})

	/**
	 * 상태를 업데이트하는 함수.
	 * 새로운 값을 직접 전달하거나, 이전 값을 받는 함수를 전달할 수 있습니다.
	 * @param updater 새로운 상태 또는 (oldData: T) => T 형식의 함수
	 */
	const setState = (updater: T | ((oldData: T | undefined) => T)) => {
		queryClient.setQueryData<T>(queryKey, updater)
	}

	return [data as T, setState] as const
}
