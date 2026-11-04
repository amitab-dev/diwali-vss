import type { Metadata } from "next";
import { Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Diwali | Visionary Staffing Solutions LLP - Pune",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${greatVibes.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
