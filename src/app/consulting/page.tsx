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
        <div className="relative min-h-screen pb-16 pt-10">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-16 animate-accordion-down">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
                        <span className="text-gradient-purple">AI项目落地咨询</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        从0到1帮您实现AI商业化，提供专业的项目落地和变现咨询服务
                    </p>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                            项目评估
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            评估您的AI项目可行性，识别潜在机会和挑战
                        </p>
                    </div>

                    <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <TrendingUp className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                            商业化策略
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            设计盈利模式，制定定价策略，规划变现路径
                        </p>
                    </div>

                    <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <Phone className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                            技术落地
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            指导技术选型，优化架构设计，加速产品开发
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="glass-card rounded-2xl p-8 md:p-10">
                        <h2 className="font-heading font-bold text-2xl text-foreground mb-8 text-center">
                            预约咨询
                        </h2>

                        {submitted ? (
                            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-500/20">
                                    <Send className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                                    提交成功！
                                </h3>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    我们会在24小时内联系您
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-white/10 hover:bg-white/5"
                                    onClick={() => setSubmitted(false)}
                                >
                                    提交新的咨询
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="name" className="text-foreground/80 mb-2 block">姓名 *</Label>
                                        <Input
                                            id="name"
                                            required
                                            placeholder="您的姓名"
                                            className="bg-black/20 border-white/10 focus:bg-black/40"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="company" className="text-foreground/80 mb-2 block">公司（选填）</Label>
                                        <Input
                                            id="company"
                                            placeholder="您的公司名称"
                                            className="bg-black/20 border-white/10 focus:bg-black/40"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-foreground/80 mb-2 block">邮箱 *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="bg-black/20 border-white/10 focus:bg-black/40"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message" className="text-foreground/80 mb-2 block">需求描述 *</Label>
                                    <Textarea
                                        id="message"
                                        required
                                        placeholder="请描述您的AI项目或咨询需求..."
                                        rows={5}
                                        className="bg-black/20 border-white/10 focus:bg-black/40 resize-none rounded-xl"
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full text-base font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-[1.01] transition-all">
                                    提交咨询
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="glass-card rounded-xl p-6 flex items-center gap-5 hover:border-primary/30 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-foreground mb-1">
                                邮箱联系
                            </h3>
                            <p className="text-sm text-muted-foreground">contact@example.com</p>
                        </div>
                    </div>

                    <div className="glass-card rounded-xl p-6 flex items-center gap-5 hover:border-green-500/30 transition-colors">
                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-foreground mb-1">
                                微信联系
                            </h3>
                            <p className="text-sm text-muted-foreground">WeChat: AI-Consulting</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
