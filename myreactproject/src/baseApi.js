// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/',  retry: 0}),
  endpoints: (builder) => ({
    getSeverityCount: builder.query({
      query: () => 'severity-count/'
    }),
    getScatterData: builder.query({
      query: () => 'severity-vs-cvss-chart/'
    }),
    sendFormData: builder.mutation({
      query: (formData) => ({
        url: 'prediction/',
        method: 'POST',
        body: formData,
      }),
    }),
    uploadCSV: builder.mutation({
      query: (file) => ({
        url: 'upload-csv/',
        method: 'POST',
        body: file,
        extraOptions: { maxRetries: 1 },
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      }),
    }),
  })
});

export const { useGetSeverityCountQuery, useGetScatterDataQuery, useUploadCSVMutation, useSendFormDataMutation } = baseApi;