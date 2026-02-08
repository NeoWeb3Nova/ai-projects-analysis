import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="zh-CN">
            <body className={`${inter.className} bg-blue-50 font-body text-slate-900`}>
                <Navbar />
                <main className="pt-28">{children}</main>
            </body>
        </html>
    );
}
