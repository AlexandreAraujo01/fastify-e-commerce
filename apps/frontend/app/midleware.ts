import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Definimos o que é público. O resto está automaticamente bloqueado.
const PUBLIC_ROUTES = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);


  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  // 3. Se NÃO for pública e NÃO tiver accessToken, tentamos o Refresh
  if (!isPublicRoute && !accessToken) {
	console.log('aqui???')
    // Se não tiver nem o Refresh Token, não há o que fazer: Login.
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Chamada para o seu controller do Fastify que criamos antes
      const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          // Repassamos o cookie de 5 dias para o Fastify validar
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json(); // { token: "..." }
        const response = NextResponse.next();

        // 4. Injetamos o novo Access Token nos cookies do browser
        response.cookies.set("access_token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 10 * 1, // 10 minutos
          path: "/",
        });

        return response;
      }
    } catch (error) {
      console.error("Erro no Silent Refresh:", error);
    }

    // Se o refresh falhar (expirou os 5 dias), manda pro login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// 5. O Matcher deve pegar tudo, exceto arquivos estáticos (_next, imagens, etc)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
