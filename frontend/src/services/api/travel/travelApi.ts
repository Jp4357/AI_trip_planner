// src/services/api/travel/travelApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiConstants } from "../../../utils/constants/api_constants";

// Inline types for now - you can move these to a separate types file
export interface TravelQuery {
    question: string;
}

export interface TravelResponse {
    answer: string;
}

// Travel API definition with basic validation
export const travelApi = createApi({
    reducerPath: "travelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiConstants.TRAVEL_API_BASE_URL,
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
            query: (travelQuery) => {
                return {
                    url: ApiConstants.TRAVEL_QUERY_ENDPOINT,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    },
                    body: JSON.stringify({
                        ...travelQuery,
                        question: travelQuery.question + " Don't use *,#@,%,^,&,() characters in the response. make headings bold and use bullet points for lists."
                    }),
                };
            },
            transformResponse: (response: any): TravelResponse => {
                // Basic response validation
                if (!response || typeof response.answer !== 'string') {
                    throw new Error('Invalid response from server');
                }
                return response;
            },
            transformErrorResponse: (response: any) => {
                console.error('Travel API Error:', response);

                return {
                    status: response.status || 'UNKNOWN_ERROR',
                    data: response.data || 'An unexpected error occurred'
                };
            },
            invalidatesTags: ['TravelPlan'],
        }),
    }),
});

// Export the hook
export const { useGetTravelPlanMutation } = travelApi;