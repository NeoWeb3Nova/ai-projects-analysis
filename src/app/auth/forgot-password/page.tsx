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
        <div className="relative min-h-[500px] flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="w-full max-w-md glass-card rounded-2xl p-8 md:p-10 relative z-10 animate-accordion-down">
                <div className="mb-8 text-center">
                    <h1 className="font-heading font-bold text-2xl text-foreground mb-2 drop-shadow-md">
                        找回密码
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        请输入您的邮箱，我们将向您发送重置链接
                    </p>
                </div>

                {submitted ? (
                    <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-green-500/20">
                            <Send className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                            链接已发送
                        </h3>
                        <p className="text-muted-foreground text-sm mb-8">
                            请检查您的电子邮箱并按照指令操作
                        </p>
                        <Link href="/auth/login">
                            <Button variant="outline" className="w-full h-11 border-white/10 hover:bg-white/5 hover:text-primary">
                                返回登录
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <form className="space-y-6" onSubmit={handleResetPassword}>
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
                                        className="pl-10 h-11"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        发送中...
                                    </>
                                ) : (
                                    '发送重置链接'
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/10 text-center">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                返回登录
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

