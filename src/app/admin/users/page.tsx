import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AdminUsersPage() {
    return (
        <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Users Management</h2>
            <div className="p-8 border border-dashed border-border rounded-lg text-center">
                <p className="text-muted-foreground mb-4">
                    User management requires specific database permissions (Service Role) or a public profiles table, which are not currently configured in this environment.
                </p>
                <p className="text-sm text-muted-foreground">
                    Please configure the Supabase Service Role Key or create a 'profiles' table to enable this feature.
                </p>
            </div>
        </div>
    );
}
