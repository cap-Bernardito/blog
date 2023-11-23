import { scrollPositionReducer } from "entities/scroll-position";
import { sessionReducer } from "entities/session";

import { baseApi } from "shared/api";

import { StaticReducers, StaticStateSchema } from "./types";

export const staticReducers: StaticReducers<StaticStateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  session: sessionReducer,
  scrollPosition: scrollPositionReducer,
};
