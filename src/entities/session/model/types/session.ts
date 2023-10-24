import { User } from "entities/user/@x";

import { SessionUserId } from "./session-schema";

export type SessionStateSchema =
  | {
      isAuthorized: false;
      isLoading: boolean;
      user: null;
      accessToken?: string;
      userId?: SessionUserId;
      _isInit?: true;
      error?: string;
    }
  | {
      isAuthorized: true;
      isLoading: boolean;
      accessToken: string;
      user: User | null;
      userId: SessionUserId;
      _isInit: true;
      error?: string;
    };
