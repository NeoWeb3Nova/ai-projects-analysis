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
            <div className="p-8 md:p-10 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <h1 className="font-heading font-bold text-2xl text-blue-900 mb-2">
                    注册成功
                </h1>
                <p className="text-slate-600 mb-8">
                    请检查您的电子邮箱以确认您的账号。确认后即可登录。
                </p>
                <Link href="/auth/login">
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 h-11">
                        前往登录
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-10">
            <div className="mb-8 text-center">
                <h1 className="font-heading font-bold text-2xl text-blue-900 mb-2">
                    创建账号
                </h1>
                <p className="text-slate-500 text-sm">
                    加入我们，开启您的 AI 项目变现之旅
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSignup}>
                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            id="name"
                            type="text"
                            placeholder="您的姓名"
                            className="pl-10 h-11"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

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
                    <Label htmlFor="password">设置密码</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            id="password"
                            type="password"
                            placeholder="至少 8 位字符"
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
                            正在创建...
                        </>
                    ) : (
                        <>
                            立即注册
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-600">
                    已经有账号？{' '}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-blue-700 hover:underline"
                    >
                        返回登录
                    </Link>
                </p>
            </div>
        </div>
    );
}

