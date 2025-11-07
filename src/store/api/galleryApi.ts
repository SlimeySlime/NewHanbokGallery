import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GalleryItem } from '../../domain/gallery_item';
import { GALLERY_ENDPOINTS } from '../../config/apiConfig';

interface FilteredGalleryParams {
  rentalStart: string | null;
  rentalEnd: string | null;
}

export const galleryApi = createApi({
  reducerPath: 'galleryApi',
  baseQuery: fetchBaseQuery({ baseUrl: GALLERY_ENDPOINTS.BASE }),

  endpoints: builder => ({
    getFilteredGallery: builder.query<GalleryItem[], FilteredGalleryParams>({
      query: ({ rentalStart, rentalEnd }) => ({
        url: 'filter/',
        params: { rentalStart, rentalEnd },
      }),
    }),
    getAllGalleryItems: builder.query<GalleryItem[], void>({
      query: () => 'filter/',
    }),
  }),
});

export const { useGetFilteredGalleryQuery, useGetAllGalleryItemsQuery } = galleryApi;
