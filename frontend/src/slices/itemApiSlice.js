import { apiSlice } from "./apiSlice";

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => ({
                url: "/api/v1/items/getItems",
            }),
            keepUnusedDataFor: 5,
        }),
        deleteItems: builder.mutation({
            query: (data) => ({
                url: "/api/v1/items/delete",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetItemsQuery, useDeleteItemsMutation } = itemApiSlice;
