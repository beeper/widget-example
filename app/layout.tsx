"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { WidgetApiImpl } from '@beeper/matrix-widget-toolkit-api';
import { useEffect, useState } from "react";
import { MuiThemeProvider, MuiWidgetApiProvider } from "@beeper/matrix-widget-toolkit-mui";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [widgetApiPromise, setWidgetApiPromise] = useState<any>(null);

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
                    <MuiWidgetApiProvider widgetApiPromise={widgetApiPromise}>
                        {children}
                    </MuiWidgetApiProvider>
                </MuiThemeProvider>
            </body>
        </html>
    )
}
