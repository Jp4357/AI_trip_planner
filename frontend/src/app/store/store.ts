// src/app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../../services/api/dummyData/dummyData";
import { travelApi } from "../../services/api/travel/travelApi";
import counterSlice from "../../features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [travelApi.reducerPath]: travelApi.reducer, // Add travel API reducer
        counter: counterSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApi.middleware,
            travelApi.middleware // Add travel API middleware
        ),
});

// Optional: For refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Inferred types for app-wide usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;