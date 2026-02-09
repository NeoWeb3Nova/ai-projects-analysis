'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Search, Bell, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const { t, locale, setLocale } = useLanguage();

    const toggleLanguage = () => {
        setLocale(locale === 'zh' ? 'en' : 'zh');
    };

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
        { href: '/cases', label: t('nav.cases') },
        { href: '/consulting', label: t('nav.consulting') },
        { href: '/pro', label: t('nav.pro') },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left Side: Logo & Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-heading font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                        {t('footer.brand')}
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-foreground',
                                    pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Side: Search & Auth */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center relative group">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
                        <input
                            type="text"
                            placeholder={t('nav.search')}
                            className="h-10 pl-9 pr-4 rounded-full bg-secondary/50 border-none text-sm w-48 focus:w-64 focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
                        />
                    </div>

                    {/* Language Toggle Switch */}
                    <div
                        onClick={toggleLanguage}
                        className="hidden md:flex items-center bg-secondary/50 rounded-full p-1 cursor-pointer w-[72px] h-9 relative border border-border/50 group hover:border-primary/30 transition-all"
                    >
                        <div
                            className={cn(
                                "absolute w-8 h-7 bg-background rounded-full shadow-sm transition-all duration-300",
                                locale === 'zh' ? "left-1" : "left-[35px]"
                            )}
                        />
                        <div className="flex w-full justify-between items-center px-1 z-10 select-none">
                            <span className={cn(
                                "text-[10px] font-bold w-7 text-center transition-colors",
                                locale === 'zh' ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                            )}>中</span>
                            <span className={cn(
                                "text-[10px] font-bold w-7 text-center transition-colors",
                                locale === 'en' ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                            )}>EN</span>
                        </div>
                    </div>

                    {session ? (
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
                                <Bell className="w-5 h-5 text-muted-foreground" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-9 w-9 cursor-pointer border border-border">
                                        <AvatarImage src={session.user.user_metadata.avatar_url} />
                                        <AvatarFallback>{session.user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>{t('nav.account')}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                                        {t('nav.profile')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push('/bookmarks')}>
                                        {t('nav.bookmarks')}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                                        {t('nav.logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button className="hidden sm:flex rounded-full px-6 font-medium" size="sm">
                                {t('nav.publish')}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/auth/login" className="hidden sm:block text-sm font-medium text-foreground hover:text-primary transition-colors">
                                {t('nav.login')}
                            </Link>
                            <Link href="/auth/register">
                                <Button className="rounded-full px-6 font-medium" size="sm">
                                    {t('nav.register')}
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-base font-medium p-2 hover:bg-secondary rounded-md"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="relative">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder={t('nav.search')}
                            className="h-10 pl-9 pr-4 rounded-md bg-secondary border-none text-sm w-full"
                        />
                        <div
                            onClick={toggleLanguage}
                            className="mt-4 flex items-center bg-secondary/50 rounded-xl p-1 cursor-pointer w-full h-12 relative border border-border/50 transition-all"
                        >
                            <div
                                className={cn(
                                    "absolute w-[calc(50%-4px)] h-10 bg-background rounded-lg shadow-sm transition-all duration-300",
                                    locale === 'zh' ? "left-1" : "left-[calc(50%+3px)]"
                                )}
                            />
                            <div className="flex w-full justify-between items-center z-10 select-none">
                                <span className={cn(
                                    "flex-1 text-center text-sm font-bold transition-colors",
                                    locale === 'zh' ? "text-foreground" : "text-muted-foreground"
                                )}>中文 (ZH)</span>
                                <span className={cn(
                                    "flex-1 text-center text-sm font-bold transition-colors",
                                    locale === 'en' ? "text-foreground" : "text-muted-foreground"
                                )}>English (EN)</span>
                            </div>
                        </div>
                    </div>
                    {!session && (
                        <div className="flex flex-col gap-2 mt-2">
                            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                                <Button variant="outline" className="w-full justify-start">{t('nav.login')}</Button>
                            </Link>
                            <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full justify-start">{t('nav.register')}</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

