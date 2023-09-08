import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata = {
  title: {
    template: "%s | Bookshelf App",
    default: "Bookshelf App",
  },
  description: "Catalog and organize library or book collection on multiple virtual bookshelves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>{children}</body>
    </html>
  );
}
