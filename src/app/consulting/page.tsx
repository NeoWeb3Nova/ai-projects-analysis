'use client';

import { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ConsultingPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen pb-16">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-blue-900 mb-4">
                        AI项目落地咨询
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        从0到1帮您实现AI商业化，提供专业的项目落地和变现咨询服务
                    </p>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bento-card">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <MessageSquare className="w-6 h-6 text-blue-700" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2">
                            项目评估
                        </h3>
                        <p className="text-sm text-slate-600">
                            评估您的AI项目可行性，识别潜在机会和挑战
                        </p>
                    </div>

                    <div className="bento-card">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-green-700" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2">
                            商业化策略
                        </h3>
                        <p className="text-sm text-slate-600">
                            设计盈利模式，制定定价策略，规划变现路径
                        </p>
                    </div>

                    <div className="bento-card">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <Phone className="w-6 h-6 text-purple-700" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2">
                            技术落地
                        </h3>
                        <p className="text-sm text-slate-600">
                            指导技术选型，优化架构设计，加速产品开发
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="bento-card">
                        <h2 className="font-heading font-bold text-2xl text-blue-900 mb-6">
                            预约咨询
                        </h2>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-green-700" />
                                </div>
                                <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2">
                                    提交成功！
                                </h3>
                                <p className="text-slate-600">
                                    我们会在24小时内联系您
                                </p>
                                <Button
                                    className="mt-6"
                                    onClick={() => setSubmitted(false)}
                                >
                                    提交新的咨询
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">姓名 *</Label>
                                    <Input
                                        id="name"
                                        required
                                        placeholder="您的姓名"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">邮箱 *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="company">公司（选填）</Label>
                                    <Input
                                        id="company"
                                        placeholder="您的公司名称"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message">需求描述 *</Label>
                                    <Textarea
                                        id="message"
                                        required
                                        placeholder="请描述您的AI项目或咨询需求..."
                                        rows={5}
                                        className="mt-2"
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                                    提交咨询
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bento-card flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-blue-700" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-blue-900 mb-1">
                                邮箱联系
                            </h3>
                            <p className="text-sm text-slate-600">contact@example.com</p>
                        </div>
                    </div>

                    <div className="bento-card flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-green-700" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-blue-900 mb-1">
                                微信联系
                            </h3>
                            <p className="text-sm text-slate-600">WeChat: AI-Consulting</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
