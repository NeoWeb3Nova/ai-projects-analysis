import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) { }
            }
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    //   // Fetch user count (requires service role or public table)
    //   const { count: userCount, error: userError } = await supabase
    //     .from('profiles') // Assuming 'profiles' table exists
    //     .select('*', { count: 'exact', head: true });

    // Fetch cases count
    const { count: casesCount, error: casesError } = await supabase
        .from('cases')
        .select('*', { count: 'exact', head: true });

    if (casesError) {
        return NextResponse.json({ error: casesError.message }, { status: 500 });
    }

    return NextResponse.json({
        users: 0, // Placeholder until user table is confirmed
        cases: casesCount || 0
    });
}
