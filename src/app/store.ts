import { configureStore } from "@reduxjs/toolkit";
import HeaderHeadingSlice from "../features/HeaderHeading/HeaderHeadingSlice";
import UserTokkenSlice from "../features/UserTokken/UserTokken";

export const store = configureStore({
  reducer: {
    UserInfo : UserTokkenSlice,
    headerHeading: HeaderHeadingSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
