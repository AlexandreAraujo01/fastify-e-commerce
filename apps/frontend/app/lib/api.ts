// apps/frontend/lib/api.ts
import { cookies } from "next/headers";

export async function apiFetch(endpoint: string, init?: RequestInit) {
  const token = (await cookies()).get("access_token")?.value;

  return fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
      Cookie: cookies().toString(), // Repassa o Refresh Token HttpOnly
    },
  });
}
