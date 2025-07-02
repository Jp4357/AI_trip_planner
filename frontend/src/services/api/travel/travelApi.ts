// src/services/api/travel/travelApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types for Travel API
export interface TravelQuery {
    question: string;
}

export interface TravelResponse {
    answer: string;
}

// Travel API definition
export const travelApi = createApi({
    reducerPath: "travelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://074c-152-52-60-98.ngrok-free.app",
        prepareHeaders: (headers) => {
            // Add ngrok bypass header to avoid browser warning
            headers.set('ngrok-skip-browser-warning', 'true');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['TravelPlan'],
    endpoints: (builder) => ({
        getTravelPlan: builder.mutation<TravelResponse, TravelQuery>({
            query: (travelQuery) => ({
                url: "/query",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                body: travelQuery,
            }),
            invalidatesTags: ['TravelPlan'],
        }),
    }),
});

// Export the hook
export const { useGetTravelPlanMutation } = travelApi;