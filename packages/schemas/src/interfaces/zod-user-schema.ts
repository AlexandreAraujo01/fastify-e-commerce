import z from "zod";
export const zodUserSchema = z.object({
  user_id: z.uuidv7(),
  email: z.email(),
  password: z.string().min(6),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  user_type: z.enum(["USER", "ADMIN"]),
});

export const zodCreateUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  user_type: z.enum(["USER", "ADMIN"]).optional().default("USER"),
});

export const zodFindUserSchema = z.object({
  user_id: z.uuidv7().optional(),
  email: z.email().optional(),
});

export const zodUserLogin = zodCreateUserSchema.pick({
  email: true,
  password: true,
});

export type userSchemaType = z.infer<typeof zodUserSchema>;
export type createUserSchemaType = z.infer<typeof zodCreateUserSchema>;
export type findUserSchemaType = z.infer<typeof zodFindUserSchema>;
export type userLoginSchema = z.infer<typeof zodUserLogin>;
