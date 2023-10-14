import { type SessionDTO, toSessionUserId } from "../api/types";
import { type Session } from "../model/types/session-schema";

export function mapSession(dto: SessionDTO): Session {
  return {
    accessToken: dto.accessToken,
    userId: toSessionUserId(dto.user.id),
  };
}
