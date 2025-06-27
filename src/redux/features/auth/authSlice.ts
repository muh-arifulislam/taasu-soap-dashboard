import type { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  name: string;
  picture: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  auth0_id: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  auth0_id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: {
        payload: {
          user: TUser;
          token: string;
          auth0_id: string;
        };
        type: string;
      }
    ) => {
      const { user, token, auth0_id } = action.payload;
      state.token = token;
      state.user = user;
      state.auth0_id = auth0_id;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.auth0_id = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAuthOId = (state: RootState) => state.auth.auth0_id;
