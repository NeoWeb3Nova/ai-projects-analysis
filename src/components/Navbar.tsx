'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Bookmark, FileText, MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { href: '/', label: '首页', icon: BookOpen },
        { href: '/cases', label: '案例', icon: FileText },
        { href: '/bookmarks', label: '收藏', icon: Bookmark },
        { href: '/consulting', label: '咨询', icon: MessageSquare },
    ];

    return (
        <>
            <nav className="fixed top-4 left-4 right-4 z-50">
                <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">AI</span>
                            </div>
                            <span className="font-heading font-semibold text-lg text-blue-900">
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
                                            isActive ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                                登录
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? (
                                <X className="w-6 h-6 text-slate-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-slate-600" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm pt-24 px-6">
                    <div className="flex flex-col gap-4">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    <Icon className="w-5 h-5 text-blue-700" />
                                    <span className="font-medium text-slate-700">{item.label}</span>
                                </Link>
                            );
                        })}
                        <Button className="w-full bg-blue-700 hover:bg-blue-800">
                            登录
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
