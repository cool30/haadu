import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import PreviewPlayer from "@/components/PreviewPlayer";
import Sidebar from "@/components/Sidebar";
import TrackPlayerProvider from "@/providers/TrackPlayerProvider";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Welcome to Haadu_Hub",
  description: "A Song Recommendation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <TrackPlayerProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="h-screen">
              <Header />
              <div className="flex flex-col h-full col-span-8 overflow-auto rounded-lg bg-orange-300">
                <Sidebar />
                <main className="mx-8 my-4">
                  <CopilotKit runtimeUrl="/api/copilotkit">
                    {children}
                  </CopilotKit>
                </main>
              </div>
            </div>
            <PreviewPlayer />
          </body>
        </TrackPlayerProvider>
      </NextAuthProvider>
    </html>
  );
}
