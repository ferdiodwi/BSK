import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Oswald,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BSK CUSTOM | Spesialis Tata Body CB & Rangka Presisi",
  description:
    "Bengkel spesialis tata body CB, restorasi rangka presisi, custom bodi, dan setting kaki-kaki motor klasik/herex. Rapi, center, bergaransi, dan siap kontes maupun harian.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${oswald.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0C10] text-[#F3F4F6] font-sans selection:bg-[#E51919] selection:text-[#FFFFFF]">
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
