import { SessionUserId } from "./session-schema";

export type SessionStateSchema =
  | {
      isAuthorized: false;
      accessToken?: string;
      userId?: SessionUserId;
      _isInit?: true;
    }
  | {
      isAuthorized: true;
      accessToken: string;
      userId: SessionUserId;
      _isInit: true;
    };
