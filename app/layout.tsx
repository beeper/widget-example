"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";
import { WidgetApiImpl } from '@beeper/matrix-widget-toolkit-api';
import { useEffect, useState } from "react";
import { MuiThemeProvider } from "@beeper/matrix-widget-toolkit-mui";

const MuiWidgetApiProvider = dynamic(() => import('@beeper/matrix-widget-toolkit-mui').then((mod) => mod.MuiWidgetApiProvider), {
    ssr: false,
})

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [widgetApiPromise, setWidgetApiPromise] = useState<any>(null);

    // Ensure WidgetApi is only created on client-side, since it needs to access "window"
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWidgetApiPromise(WidgetApiImpl.create({
                capabilities: [],
            }));
        }
    }, []);

    if (!widgetApiPromise) return (
        <html lang="en">
            <body className={inter.className}>
            </body>
        </html>
    );

    return (
        <html lang="en">
            <body className={inter.className}>
                <MuiThemeProvider>
                    {/* Fallback suspense if no higher one is registered (used for i18n) */}
                    <MuiWidgetApiProvider widgetApiPromise={widgetApiPromise}>
                        {children}
                    </MuiWidgetApiProvider>
                </MuiThemeProvider>
            </body>
        </html>
    )
}
