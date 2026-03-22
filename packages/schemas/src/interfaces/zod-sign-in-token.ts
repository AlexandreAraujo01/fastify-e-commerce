import z from "zod";

export const zodUserSignInToken = z.object({
  token: z.string(),
});

export type UserSignInTokeType = z.infer<typeof zodUserSignInToken>;
