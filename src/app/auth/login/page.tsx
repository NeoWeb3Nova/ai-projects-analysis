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
        <div className="p-8 md:p-10">
            <div className="mb-8 text-center">
                <h1 className="font-heading font-bold text-2xl text-blue-900 mb-2">
                    欢迎回来
                </h1>
                <p className="text-slate-500 text-sm">
                    登录以管理您的收藏并获取专业咨询
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">电子邮箱</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10 h-11"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">密码</Label>
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs text-blue-700 hover:underline"
                        >
                            忘记密码？
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-11"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base font-medium transition-all active:scale-[0.98]"
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
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-600">
                    还没有账号？{' '}
                    <Link
                        href="/auth/signup"
                        className="font-semibold text-blue-700 hover:underline"
                    >
                        立即注册
                    </Link>
                </p>
            </div>
        </div>
    );
}

