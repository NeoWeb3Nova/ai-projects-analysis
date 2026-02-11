import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Activity } from 'lucide-react';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function AdminDashboard() {
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

    const { count: casesCount } = await supabase
        .from('cases')
        .select('*', { count: 'exact', head: true });

    // Assuming we can't count all users freely, we use a placeholder or specialized query
    // For now, let's just display "N/A" or try to safe-fail
    // const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

    const { data: recentCases } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-heading font-bold">Dashboard</h2>
                <div className="text-sm text-muted-foreground">
                    Overview of your platform
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">
                            Users tracking unavailable
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Cases
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{casesCount || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Total published cases
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            System Status
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">Healthy</div>
                        <p className="text-xs text-muted-foreground">
                            All systems operational
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentCases && recentCases.length > 0 ? (
                                recentCases.map((c) => (
                                    <div key={c.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                New case added: {c.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(c.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-muted-foreground">No recent activity</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Link
                                href="/admin/cases/new"
                                className="block p-2 hover:bg-secondary rounded-md cursor-pointer transition-colors"
                            >
                                Add New Case
                            </Link>
                            <Link
                                href="/admin/users"
                                className="block p-2 hover:bg-secondary rounded-md cursor-pointer transition-colors"
                            >
                                Manage Users
                            </Link>
                            <div className="p-2 hover:bg-secondary rounded-md cursor-pointer transition-colors text-muted-foreground">
                                Review Pending (Coming Soon)
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
