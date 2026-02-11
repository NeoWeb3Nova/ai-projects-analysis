import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        console.log('Middleware: Checking admin access for', request.nextUrl.pathname);
        if (!session) {
            console.log('Middleware: No session found, redirecting to login');
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
        const userEmail = session.user.email;

        console.log('Middleware: User email:', userEmail);
        console.log('Middleware: Admin emails:', adminEmails);

        if (!userEmail || !adminEmails.includes(userEmail)) {
            console.log('Middleware: User not authorized, redirecting to home');
            return NextResponse.redirect(new URL('/', request.url));
        }
        console.log('Middleware: Access granted');
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};
