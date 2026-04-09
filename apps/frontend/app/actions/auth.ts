// apps/frontend/app/actions/auth.ts
"use server";

import type { userLoginSchema } from "@fastify-e-commerce/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: userLoginSchema) {
  const email = formData.email;
  const password = formData.password;

  const res = await fetch(`${process.env.BACKEND_URL}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errorData: {message: string};
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: "Erro crítico no backend" };
    }
    return { error: errorData.message };
  }

  const data = await res.json();

  // 1. Grava o Access Token num cookie seguro do lado do Next.js
  (
    await // 1. Grava o Access Token num cookie seguro do lado do Next.js
    cookies()
  ).set("access_token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 1 dia (ajuste conforme seu JWT)
    path: "/",
  });

  // 2. Se o seu backend também enviou um Set-Cookie (Refresh Token),
  // o Next.js já repassou ele automaticamente se os domínios forem os mesmos.

  redirect("/shop");
}
