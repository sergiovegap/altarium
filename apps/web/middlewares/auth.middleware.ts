import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function authMiddleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
            return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
           cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )

   const { data: { user } } = await supabase.auth.getUser();

  // Si no hay sesión y está intentando acceder al dashboard → redirige al login
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
     return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay sesión y está en login/register → redirige al dashboard
  if (user && (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  )) {
     return NextResponse.redirect(new URL('/dashboard', request.url));
  }

   return supabaseResponse;
}

export const config = {
   matcher: ['/dashboard/:path*', '/login', '/register']
}