import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getLocaleServer } from "@/lib/i18n-server";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
    display: 'swap',
});

export async function generateMetadata() {
    const locale = await getLocaleServer();
    const isZh = locale === 'zh';

    return {
        title: isZh ? "AI案例拆解 - 理解AI项目的变现路径" : "AI Projects Analysis - Understand AI Monetization",
        description: isZh ? "深入拆解AI落地案例，分析盈利模式，一步一步理解变现路径" : "Deep dive into AI implementation cases, analyzing monetization models and growth paths.",
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocaleServer();
    const lang = locale === 'zh' ? 'zh-CN' : 'en';

    return (
        <html lang={lang} className={`${outfit.variable} ${inter.variable} antialiased`}>
            <body className="bg-background font-sans text-foreground min-h-screen selection:bg-primary/30">
                <LanguageProvider>
                    <Navbar />
                    <main className="">{children}</main>
                </LanguageProvider>
            </body>
        </html>
    );
}
