'use client';

import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookmarksPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bookmark className="w-8 h-8 text-blue-700" />
                    </div>
                    <h1 className="font-heading font-bold text-2xl text-blue-900 mb-2">
                        我的收藏
                    </h1>
                    <p className="text-slate-600 mb-6">
                        登录后即可收藏您感兴趣的案例
                    </p>
                    <Link href="/auth/login">
                        <Button className="bg-blue-700 hover:bg-blue-800">
                            立即登录
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
