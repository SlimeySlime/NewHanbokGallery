import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const timedFetchBaseQuery = (
  baseUrl: string,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    const start = performance.now();
    const result = await baseQuery(args, api, extraOptions);
    const end = performance.now();
    const duration = end - start;

    const url = typeof args === 'string' ? args : args.url;
    console.log(`API Request to ${url} took ${duration.toFixed(2)} ms`);

    return result;
  };
};
