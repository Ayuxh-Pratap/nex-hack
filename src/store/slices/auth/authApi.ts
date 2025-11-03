import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TokenExchangeRequest, TokenExchangeResponse, User } from "@/types/auth";
import type { SessionsQueryParams, SessionsResponse } from "@/types/chat";
import { tokenService } from "@/services/tokenService";

// Base API with token injection
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    prepareHeaders: (headers) => {
        const token = tokenService.getBackendToken();
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Auth API slice
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        // Exchange Firebase token for backend token
        exchangeToken: builder.mutation<TokenExchangeResponse, TokenExchangeRequest>({
            query: (body) => ({
                url: "/auth/user",
                method: "POST",
                body,
            }),
        }),
        // Get current user profile
        getCurrentUser: builder.query<User, void>({
            query: () => "/auth/user",
        }),
        // Get user sessions with pagination
        getSessions: builder.query<SessionsResponse, SessionsQueryParams>({
            query: (params) => ({
                url: "/user/sessions",
                params: {
                    page_number: params.page_number,
                    page_size: params.page_size,
                },
            }),
        }),
    }),
});

export const { 
    useExchangeTokenMutation, 
    useGetCurrentUserQuery,
    useGetSessionsQuery,
    useLazyGetSessionsQuery,
} = authApi;

