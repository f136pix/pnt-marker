import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {NextAuthProvider} from '@/context/NextAuthProvider';
import AuthProvider from '@/context/AuthProvider';
import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import ScreenWrapper from "../../utils/components/ScreenWrapper";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (

        <NextAuthProvider>
            <AuthProvider>
                <html lang="en">
                <head>
                    <ColorSchemeScript/>
                </head>
                <body><MantineProvider> {children}</MantineProvider></body>
                </html>

            </AuthProvider>
        </NextAuthProvider>

    );
}
