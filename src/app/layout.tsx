import { Nunito_Sans } from 'next/font/google'
import type { Metadata } from "next";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import "~/styles/globals.css";

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: PROJECT_TITLE,
  description: PROJECT_DESCRIPTION,
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${appUrl}/opengraph-image.png`,
    'fc:frame:post_url': `${appUrl}/api/frame`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-dvh bg-background font-sans antialiased">
        <main className="mx-auto w-full max-w-[600px] px-4 pb-4">
          {children}
        </main>
      </body>
    </html>
  );
}
