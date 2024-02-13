import "./globals.css";
import { Krub } from "next/font/google";

const krub = Krub({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  weight: ["200", "400", "700"],
});

export const metadata = {
  title: "Wisp",
  description: "Batch watermark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={krub.className}>{children}</body>
    </html>
  );
}
