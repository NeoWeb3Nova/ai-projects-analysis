'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSupabaseConfigured) {
            setError('Supabase 未配置。请在 .env.local 文件中配置数据库 URL 和 Key。');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError('登录过程中发生错误，请稍后再试。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[500px] flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="w-full max-w-md glass-card rounded-2xl p-8 md:p-10 relative z-10 animate-accordion-down">
                <div className="mb-8 text-center">
                    <h1 className="font-heading font-bold text-3xl text-foreground mb-2 drop-shadow-md">
                        欢迎回来
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        登录以管理您的收藏并获取专业咨询
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg backdrop-blur-md">
                            <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground/80">电子邮箱</Label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="pl-10 h-11 bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:bg-white/10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-foreground/80">密码</Label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                            >
                                忘记密码？
                            </Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 h-11 bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:bg-white/10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                登录中...
                            </>
                        ) : (
                            <>
                                登录
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-muted-foreground">
                        还没有账号？{' '}
                        <Link
                            href="/auth/signup"
                            className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                        >
                            立即注册
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

