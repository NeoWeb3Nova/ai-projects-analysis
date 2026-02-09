'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProPage() {
    const { t } = useLanguage();

    const plans = [
        {
            id: 'monthly',
            name: t('pro.plans.monthly.name'),
            price: t('pro.plans.monthly.price'),
            period: '/mo',
            description: t('pro.plans.monthly.description'),
            icon: <Zap className="w-6 h-6 text-blue-500" />,
            popular: false,
        },
        {
            id: 'annual',
            name: t('pro.plans.annual.name'),
            price: t('pro.plans.annual.price'),
            period: '/yr',
            description: t('pro.plans.annual.description'),
            icon: <Star className="w-6 h-6 text-amber-500" />,
            popular: true,
        },
        {
            id: 'lifetime',
            name: t('pro.plans.lifetime.name'),
            price: t('pro.plans.lifetime.price'),
            period: '',
            description: t('pro.plans.lifetime.description'),
            icon: <Crown className="w-6 h-6 text-purple-500" />,
            popular: false,
        },
    ];

    const features = t('pro.features.list') as unknown as string[];
    const faqs = t('pro.faq.items') as unknown as { q: string, a: string }[];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        {t('pro.hero.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        {t('pro.hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={cn(
                                    "relative flex flex-col p-8 rounded-3xl border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                                    plan.popular ? "border-primary ring-1 ring-primary shadow-xl scale-105" : "border-border"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                                        Best Value
                                    </div>
                                )}
                                <div className="mb-6">{plan.icon}</div>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-8 flex-grow">
                                    {plan.description}
                                </p>
                                <Button
                                    className={cn(
                                        "w-full rounded-full py-6 font-bold text-lg",
                                        plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    )}
                                >
                                    {t('pro.cta')}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-bold mb-16">{t('pro.features.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 text-left max-w-4xl mx-auto">
                        {(features && Array.isArray(features)) && features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="mt-1 p-0.5 rounded-full bg-primary/20">
                                    <Check className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-lg font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">{t('pro.faq.title')}</h2>
                <div className="space-y-8">
                    {(faqs && Array.isArray(faqs)) && faqs.map((faq, idx) => (
                        <div key={idx} className="group">
                            <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {faq.q}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 p-12 rounded-[3rem] bg-foreground text-background relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">
                            {t('pro.hero.title')}
                        </h2>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 rounded-full text-xl font-bold h-auto">
                            {t('pro.cta')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
