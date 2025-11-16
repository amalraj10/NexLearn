import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { LayoutContent } from "@/components/layout";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "NexLearn - Online Examination Platform",
    template: "%s | NexLearn"
  },
  description: "Modern online examination platform with JWT authentication, real-time timer, and comprehensive exam management. Take tests, track progress, and improve your learning.",
  keywords: ["online exam", "examination platform", "online test", "learning platform", "MCQ test", "education", "e-learning"],
  authors: [{ name: "NexLearn" }],
  creator: "NexLearn",
  publisher: "NexLearn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nexlearn.noviindusdemosites.in'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexlearn.noviindusdemosites.in",
    title: "NexLearn - Online Examination Platform",
    description: "Modern online examination platform with JWT authentication and real-time exam management",
    siteName: "NexLearn",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexLearn - Online Examination Platform",
    description: "Modern online examination platform with JWT authentication and real-time exam management",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}
