import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from '@components/ui/toaster';
import AppBar from '@components/app-bar';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    title: 'Turbo Auth',
    description: 'Authentication mechanism between Next and Nest',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    enableColorScheme
                    disableTransitionOnChange
                >
                    <AppBar />
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
