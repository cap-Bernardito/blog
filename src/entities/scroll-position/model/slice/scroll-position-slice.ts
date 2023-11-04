import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScrollPositionStateSchema } from "../types/scroll-position";

const initialState: ScrollPositionStateSchema = {
  scroll: {},
};

export const scrollPositionSlice = createSlice({
  name: "scrollPositionSlice",
  initialState,
  reducers: {
    setScroll: (state, { payload }: PayloadAction<{ pathname: string; scrollY: number }>) => {
      const { pathname, scrollY } = payload;

      state.scroll[pathname] = scrollY;
    },
  },
});

export const { actions: scrollPositionActions } = scrollPositionSlice;
export const { reducer: scrollPositionReducer } = scrollPositionSlice;
