import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener - Shorten URLs, Track Analytics",
  description: "Create short, memorable links in seconds. Track clicks, analyze performance, and share with confidence. Free link shortening service with advanced analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(var(--primary))",
          colorBackground: "hsl(var(--background))",
          colorInputBackground: "hsl(var(--background))",
          colorInputText: "hsl(var(--foreground))",
          colorText: "hsl(var(--foreground))",
          colorTextSecondary: "hsl(var(--muted-foreground))",
          colorDanger: "hsl(var(--destructive))",
          colorSuccess: "hsl(var(--primary))",
          colorWarning: "hsl(var(--chart-4))",
          colorNeutral: "hsl(var(--muted))",
          colorTextOnPrimaryBackground: "hsl(var(--primary-foreground))",
          fontFamily: "var(--font-geist-sans)",
          fontFamilyButtons: "var(--font-geist-sans)",
          fontSize: "1rem",
          fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
          borderRadius: "var(--radius)",
        },
        elements: {
          card: "!bg-black !text-white !border !border-white !shadow-2xl",
          modal: "!bg-black !text-white !border !border-white !shadow-2xl",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
          formFieldInput: "border-input focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors",
          footerActionLink: "text-primary hover:text-primary/80 transition-colors",
          identityPreviewText: "text-foreground",
          identityPreviewEditButton: "text-primary hover:text-primary/80",
          formFieldLabel: "text-foreground font-medium",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
          socialButtonsBlockButton: "border-input hover:bg-accent hover:text-accent-foreground transition-colors",
          socialButtonsBlockButtonText: "text-foreground font-medium",
          formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
          footer: "hidden",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
