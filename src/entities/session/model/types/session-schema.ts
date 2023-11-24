import { z } from "zod";

const sessionUserIdSchema = z.number().brand<"SessionUserId">();

export const sessionSchema = z.object({
  userId: sessionUserIdSchema,
});

export type Session = z.infer<typeof sessionSchema>;

export type SessionUserId = z.infer<typeof sessionUserIdSchema>;

export const isSession = (session: unknown): session is Session => {
  const { success } = sessionSchema.safeParse(session);

  return success;
};
