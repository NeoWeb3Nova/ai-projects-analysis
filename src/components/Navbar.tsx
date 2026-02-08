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
            <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <div className="w-full max-w-5xl glass rounded-full px-6 py-3 transition-all duration-300 hover:bg-black/60">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/30 transition-all duration-300">
                                <span className="text-primary-foreground font-heading font-bold text-sm group-hover:scale-110 transition-transform">AI</span>
                            </div>
                            <span className="font-heading font-semibold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
                                案例拆解
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map(item => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
                                            isActive
                                                ? 'bg-primary/10 text-primary shadow-[0_0_10px_rgba(124,58,237,0.2)]'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="hidden md:flex items-center gap-4 pl-4 border-l border-white/10">
                            {session ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-xs font-medium text-foreground max-w-[100px] truncate">
                                            {session.user.user_metadata.full_name || session.user.email}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/auth/login">
                                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all hover:scale-105">
                                        登录
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
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

