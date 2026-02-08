'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSupabaseConfigured) {
            setError('Supabase 未配置。请在 .env.local 文件中填写 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            setError('注册过程中发生错误，请稍后再试。');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[500px] flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]" />
                </div>

                <div className="w-full max-w-md glass-card rounded-2xl p-8 md:p-10 text-center animate-accordion-down">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center ring-2 ring-green-500/20">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
                        注册成功
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        请检查您的电子邮箱以确认您的账号。确认后即可登录。
                    </p>
                    <Link href="/auth/login">
                        <Button className="w-full h-11 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-green-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] bg-green-500">
                            前往登录
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-[600px] flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="w-full max-w-md glass-card rounded-2xl p-8 md:p-10 relative z-10 animate-accordion-down">
                <div className="mb-8 text-center">
                    <h1 className="font-heading font-bold text-3xl text-foreground mb-2 drop-shadow-md">
                        创建账号
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        加入我们，开启您的 AI 项目变现之旅
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSignup}>
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg backdrop-blur-md">
                            <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground/80">姓名</Label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                id="name"
                                type="text"
                                placeholder="您的姓名"
                                className="pl-10 h-11 bg-white/5 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:bg-white/10"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                        <Label htmlFor="password" className="text-foreground/80">设置密码</Label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="至少 8 位字符"
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
                                正在创建...
                            </>
                        ) : (
                            <>
                                立即注册
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-muted-foreground">
                        已经有账号？{' '}
                        <Link
                            href="/auth/login"
                            className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                        >
                            返回登录
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

