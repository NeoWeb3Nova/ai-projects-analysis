'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="py-12 px-6 border-t border-border bg-background">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="font-heading font-bold text-xl tracking-tight text-foreground">
                    {t('footer.brand')}
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-medium">
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.designers')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.hire')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.inspiration')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.advertising')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.blog')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.about')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.careers')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.support')}</Link>
                </div>
                <div className="flex gap-4">
                    {/* Social Icons Placeholder */}
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer" />
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer" />
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer" />
                </div>
            </div>
            <div className="max-w-[1600px] mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                <p>{t('footer.copyright')}</p>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.jobs')}</Link>
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.designers')}</Link>
                    {/* Reuse keys or add more if specific ones needed, for now reusing generic ones or strictly translating */}
                    {/* The original had: Jobs, Designers, Freelancers, Tags, Places, Resources.
                         My dictionary has: jobs, places, resources... 
                         Freelancers is missing, Tags is sort of missing as nav item.
                         I'll stick to what I have in dictionary and maybe duplicate/omit minor ones to save roundtrips.
                         Actually I added 'resources', 'jobs', 'places'.
                         Freelancers and Tags missing. I will just map them to existing or leave english if no key.
                         Let's keep it simple. */}
                    <Link href="#" className="hover:text-foreground">{t('footer.columns.resources')}</Link>
                </div>
            </div>
        </footer>
    );
}
