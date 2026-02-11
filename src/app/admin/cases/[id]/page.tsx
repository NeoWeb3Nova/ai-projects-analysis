import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { CaseForm } from '@/components/admin/CaseForm';
import { notFound } from 'next/navigation';

export default async function EditCasePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
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

    const { data: caseItem } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();

    if (!caseItem) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8">Edit Case</h2>
            <CaseForm initialData={caseItem} isEditing={true} />
        </div>
    );
}
