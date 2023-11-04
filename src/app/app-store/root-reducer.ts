import { scrollPositionReducer } from "entities/scroll-position";
import { sessionReducer } from "entities/session";

import { StaticReducers, StaticStateSchema } from "./types";

export const staticReducers: StaticReducers<StaticStateSchema> = {
  session: sessionReducer,
  scrollPosition: scrollPositionReducer,
};
