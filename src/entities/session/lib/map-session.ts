import { type SessionDto, toSessionUserId } from "../api/types";
import { type Session } from "../model/types";

export function mapSession(dto: SessionDto): Session {
  return {
    accessToken: dto.accessToken,
    userId: toSessionUserId(dto.user.id),
  };
}
