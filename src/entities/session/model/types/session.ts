import { SessionUserId } from "./session-schema";

export type SessionStateSchema =
  | {
      isAuthorized: false;
      isLoading: boolean;
      userId?: SessionUserId;
      _isInit?: true;
      error?: string;
    }
  | {
      isAuthorized: true;
      isLoading: boolean;
      userId: SessionUserId;
      _isInit: true;
      error?: string;
    };
