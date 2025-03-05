import { Inter, Nunito } from 'next/font/google'
import type { Metadata } from "next";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import "~/styles/globals.css";
import { Providers } from "~/app/providers";
import { AppSidebar } from "~/components/app-sidebar";
import { NavActions } from "~/components/nav-actions";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito', 
  display: 'swap',
});
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
              <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                  <div className="flex flex-1 items-center gap-2 px-3">
                    {/* 
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  */}
                <header className="h-14 shrink-0" />
                <main className="flex-1">
                  {children}
                </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
