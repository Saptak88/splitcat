import { apiSlice } from "./apiSlice";

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => ({
                url: "/api/v1/dashboard",
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetItemsQuery } = itemApiSlice;
