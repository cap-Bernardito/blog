import { userReducer } from "entities/user";

import { StaticReducers, StaticStateSchema } from "./types";

export const staticReducers: StaticReducers<StaticStateSchema> = {
  user: userReducer,
};
