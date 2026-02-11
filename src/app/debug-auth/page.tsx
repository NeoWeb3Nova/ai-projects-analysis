'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function DebugAuthPage() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) return <div className="p-8">Loading session info...</div>;

    const userEmail = session?.user?.email;
    const isAdmin = userEmail && adminEmails.includes(userEmail);

    return (
        <div className="container mx-auto p-8 space-y-6 max-w-2xl">
            <h1 className="text-2xl font-bold">Authentication Debugger</h1>

            <div className="p-4 border rounded-lg space-y-2">
                <h2 className="font-semibold text-lg">Session Status</h2>
                <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Is Logged In:</span>
                    <span className={session ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {session ? "Yes" : "No"}
                    </span>

                    <span className="text-muted-foreground">User Email:</span>
                    <span>{userEmail || "N/A"}</span>

                    <span className="text-muted-foreground">User ID:</span>
                    <span className="font-mono text-sm">{session?.user?.id || "N/A"}</span>
                </div>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
                <h2 className="font-semibold text-lg">Admin Check</h2>
                <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Configured Admin Emails:</span>
                    <span className="font-mono text-sm break-all">{process.env.NEXT_PUBLIC_ADMIN_EMAILS || "Not Set"}</span>

                    <span className="text-muted-foreground">Is Admin:</span>
                    <span className={isAdmin ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {isAdmin ? "YES" : "NO"}
                    </span>
                </div>
            </div>

            <div className="flex gap-4">
                {!session ? (
                    <Link href="/auth/login">
                        <Button>Go to Login</Button>
                    </Link>
                ) : (
                    <Button variant="destructive" onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.reload();
                    }}>
                        Sign Out
                    </Button>
                )}

                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>

                {isAdmin && (
                    <Link href="/admin">
                        <Button variant="default">Try Admin Dashboard</Button>
                    </Link>
                )}
            </div>

            <div className="text-sm text-muted-foreground bg-muted p-4 rounded mt-8">
                <p><strong>Note:</strong> If you are logged in but "Is Admin" is NO:</p>
                <ol className="list-decimal list-inside ml-2 mt-2">
                    <li>Check if your email matches the generic admin email exactly.</li>
                    <li>Ensure there are no extra spaces in <code>NEXT_PUBLIC_ADMIN_EMAILS</code>.</li>
                </ol>
            </div>
        </div>
    );
}
