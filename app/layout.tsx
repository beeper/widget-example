"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";
import { WidgetApiImpl } from '@beeper/matrix-widget-toolkit-api';

const MuiThemeProvider = dynamic(() => import('@beeper/matrix-widget-toolkit-mui').then((mod) => mod.MuiThemeProvider), {
  ssr: false,
})
const MuiWidgetApiProvider = dynamic(() => import('@beeper/matrix-widget-toolkit-mui').then((mod) => mod.MuiWidgetApiProvider), {
  ssr: false,
})

const widgetApiPromise = WidgetApiImpl.create();

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiThemeProvider>
          {/* Fallback suspense if no higher one is registered (used for i18n) */}
          <MuiWidgetApiProvider
              widgetApiPromise={widgetApiPromise}
              // widgetRegistration={{
              //   name: 'Example Widget'
              // }}
          >
            {children}
          </MuiWidgetApiProvider>
        </MuiThemeProvider>
      </body>
    </html>
  )
}
