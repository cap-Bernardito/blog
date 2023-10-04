import { z } from "zod";

const envVariables = z.object({
  API_BASEURL: z.string().url(),
  CLIENT_PORT: z.number(),
  SERVER_PORT: z.number(),
});

export const configEnv = {
  API_BASEURL: import.meta.env.API_BASEURL,
  CLIENT_PORT: Number(import.meta.env.CLIENT_PORT),
  SERVER_PORT: Number(import.meta.env.SERVER_PORT),
} as const;

declare global {
  interface ImportMeta {
    readonly env: z.infer<typeof envVariables>;
  }
}

envVariables.parse(configEnv);
