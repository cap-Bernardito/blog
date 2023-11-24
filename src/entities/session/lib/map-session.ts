import { type SessionDTO, toSessionUserId } from "../api/types";
import { type Session } from "../model/types/session-schema";

export function mapSession(dto: SessionDTO["user"]): Session {
  return {
    userId: toSessionUserId(dto.id),
  };
}
