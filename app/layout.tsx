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
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="max-w-4xl mx-auto py-10 px-4">
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
