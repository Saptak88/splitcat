import { apiSlice } from "./apiSlice";

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => ({
                url: "/api/v1/items/getItems",
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetItemsQuery } = itemApiSlice;
