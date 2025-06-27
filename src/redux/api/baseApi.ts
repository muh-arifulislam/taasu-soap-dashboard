/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type DefinitionType,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";

import type { RootState } from "../store";

//http://localhost:5000/api
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    //logut user and clear auth state
  }
  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as any)?.message);
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "customers",
    "products",
    "orders",
    "notifications",
    "invoices",
    "payments",
    "users",
  ],
  endpoints: () => ({}),
});
