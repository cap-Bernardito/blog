import { Session, SessionUserId } from "./session-schema";

export type SessionStateSchema =
  | {
      isAuthorized: false;
      isLoading: boolean;
      userId?: SessionUserId;
      role?: Session["role"];
      _isInit?: true;
      error?: string;
    }
  | {
      isAuthorized: true;
      isLoading: boolean;
      userId: SessionUserId;
      role: Session["role"];
      _isInit: true;
      error?: string;
    };
