'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
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

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                            required
                        />
                    </div>
                </div>

                <Button className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base font-medium transition-all active:scale-[0.98]">
                    登录
                    <ArrowRight className="ml-2 w-4 h-4" />
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
