'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Send, Loader2, AlertTriangle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSupabaseConfigured) {
            setError('Supabase 未配置。请检查环境变量。');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/login`,
            });

            if (error) {
                setError(error.message);
            } else {
                setSubmitted(true);
            }
        } catch (err: any) {
            setError('请求发送过程中发生错误，请稍后再试。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 md:p-10">
            <div className="mb-8 text-center">
                <h1 className="font-heading font-bold text-2xl text-blue-900 mb-2">
                    找回密码
                </h1>
                <p className="text-slate-500 text-sm">
                    请输入您的邮箱，我们将向您发送重置链接
                </p>
            </div>

            {submitted ? (
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-8 h-8 text-green-700" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2">
                        链接已发送
                    </h3>
                    <p className="text-slate-600 text-sm mb-8">
                        请检查您的电子邮箱并按照指令操作
                    </p>
                    <Link href="/auth/login">
                        <Button variant="outline" className="w-full h-11">
                            返回登录
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <form className="space-y-6" onSubmit={handleResetPassword}>
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

                        <Button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base font-medium transition-all active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    发送中...
                                </>
                            ) : (
                                '发送重置链接'
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-700"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            返回登录
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

