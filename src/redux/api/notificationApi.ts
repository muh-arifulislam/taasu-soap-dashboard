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
import { logout } from "../features/auth/authSlice";

//https://taasu-soap-backend.vercel.app/api/v1
//http://localhost:5001/api/v1

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api/v1",
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `${token}`);
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
  const dispatch = api.dispatch;

  if (result?.error?.status === 401) {
    dispatch(logout());
  }

  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as any)?.message);
  }
  return result;
};

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["notifications"],
  endpoints: () => ({}),
});
