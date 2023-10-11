import { profileReducer } from "entities/profile";
import { sessionReducer } from "entities/session";

import { StaticReducers, StaticStateSchema } from "./types";

export const staticReducers: StaticReducers<StaticStateSchema> = {
  session: sessionReducer,
  profile: profileReducer,
};
