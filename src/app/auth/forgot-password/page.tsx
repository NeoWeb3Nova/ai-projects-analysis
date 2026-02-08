'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

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
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                        <div className="space-y-2">
                            <Label htmlFor="email">电子邮箱</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>
                        </div>

                        <Button className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base font-medium transition-all active:scale-[0.98]">
                            发送重置链接
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
