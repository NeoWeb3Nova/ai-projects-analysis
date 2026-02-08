'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Bookmark, FileText, MessageSquare, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const navItems = [
        { href: '/', label: '首页', icon: BookOpen },
        { href: '/cases', label: '案例', icon: FileText },
        { href: '/bookmarks', label: '收藏', icon: Bookmark },
        { href: '/consulting', label: '咨询', icon: MessageSquare },
    ];

    return (
        <>
            <nav className="fixed top-4 left-4 right-4 z-50">
                <div className="max-w-7xl mx-auto bg-background/95 backdrop-blur-sm rounded-2xl shadow-lg border border-border px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">AI</span>
                            </div>
                            <span className="font-heading font-semibold text-lg text-foreground">
                                案例拆解
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map(item => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2 text-sm font-medium transition-colors',
                                            isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {session ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-xs font-medium text-foreground max-w-[100px] truncate">
                                            {session.user.user_metadata.full_name || session.user.email}
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="text-muted-foreground border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        退出
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/auth/login">
                                    <Button size="sm">
                                        登录
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? (
                                <X className="w-6 h-6 text-foreground" />
                            ) : (
                                <Menu className="w-6 h-6 text-foreground" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-24 px-6">
                    <div className="flex flex-col gap-4">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-accent transition-colors"
                                >
                                    <Icon className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-foreground">{item.label}</span>
                                </Link>
                            );
                        })}

                        {session ? (
                            <div className="flex flex-col gap-3 pt-4 border-t border-border">
                                <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
                                    <User className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-foreground">
                                        {session.user.user_metadata.full_name || session.user.email}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full text-destructive border-border hover:bg-destructive/10"
                                    onClick={() => {
                                        handleLogout();
                                        setMobileOpen(false);
                                    }}
                                >
                                    退出登录
                                </Button>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="w-full" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full py-6 text-base">
                                    登录
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

