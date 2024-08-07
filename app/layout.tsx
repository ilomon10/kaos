import { GeistSans } from "geist/font/sans";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Kaos",
  description: "The fastest way to build your dream clothes with Love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
