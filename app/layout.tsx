import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { MainMenu } from "@/components/MainMenu/component";
import { GithubButton, LinkedInButton } from "@/components/social-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elliot Roe",
  description: "Made with <3",
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-dotted dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="mx-auto w-screen h-screen p-5 max-w-5xl">
            <header>
              <div className="flex items-center justify-between">
                <div className="flex flex-row">
                  <ModeToggle />
                  <GithubButton />
                  <LinkedInButton />
                </div>
                <MainMenu />
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
