import { sessionSchema } from "../model/types/session-schema";

export const checkSession = (session: unknown): void => {
  sessionSchema.parse(session);
};
