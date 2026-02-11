import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { CasesTable } from '@/components/admin/CasesTable';

export default async function AdminCasesPage() {
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

    const { data: cases } = await supabase
        .from('cases')
        .select('id, title, category, published_at, slug')
        .order('created_at', { ascending: false });

    return (
        <div>
            <CasesTable initialCases={cases || []} />
        </div>
    );
}
