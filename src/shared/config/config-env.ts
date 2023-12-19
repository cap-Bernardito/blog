import { z } from "zod";

const envVariables = z.object({
  API_BASEURL: z.string().url(),
  CLIENT_PORT: z.string(),
  SERVER_PORT: z.string(),
});

export const configEnv = {
  API_BASEURL: __API_BASEURL__,
  CLIENT_PORT: __CLIENT_PORT__,
  SERVER_PORT: __SERVER_PORT__,
} as const;

declare global {
  interface ImportMeta {
    readonly env: z.infer<typeof envVariables>;
  }
}

envVariables.parse(configEnv);
