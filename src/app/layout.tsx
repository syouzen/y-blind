import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/utils/tailwind";
import RQProvider from "./_provider/rq-provider";
import { ToastContainer } from "react-toastify";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const contents = {
  title: "YBLIND - 당신의 속마음을 털어놓는 곳",
  description: "당신의 속마음을 털어놓는 곳",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: contents.title,
  description: contents.description,
  openGraph: {
    title: contents.title,
    description: contents.description,
    images: ["https://syouzenas.synology.me/y-blind/logo.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body id="yb-body">
        <div
          className={cn(
            "flex items-start justify-center transition-opacity opacity-100 bg-white",
            "relative w-full max-w-[var(--mobile-width)] min-h-[100dvh] mx-auto scrollbar-hide"
          )}
        >
          <RQProvider>{children}</RQProvider>
          <ToastContainer
            closeButton={false}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            position="top-center"
            autoClose={2500}
            limit={1}
            hideProgressBar
          />
        </div>
      </body>
    </html>
  );
}
