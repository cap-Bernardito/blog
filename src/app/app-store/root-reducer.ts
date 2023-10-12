import { sessionReducer } from "entities/session";
import { userReducer } from "entities/user";

import { StaticReducers, StaticStateSchema } from "./types";

export const staticReducers: StaticReducers<StaticStateSchema> = {
  session: sessionReducer,
  user: userReducer,
};
