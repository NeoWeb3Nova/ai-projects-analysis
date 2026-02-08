import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: '--font-dm-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "AI案例拆解 - 理解AI项目的变现路径",
    description: "深入拆解AI落地案例，分析盈利模式，一步一步理解变现路径",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" className={`${outfit.variable} ${dmSans.variable}`}>
            <body className="bg-background font-sans text-foreground min-h-screen selection:bg-primary/30">
                <LanguageProvider>
                    <Navbar />
                    <main className="">{children}</main>
                </LanguageProvider>
            </body>
        </html>
    );
}
