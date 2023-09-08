import Link from "next/link";
import { Library } from "lucide-react";

export const metadata = {
  title: "Your virtual library",
};

export default function Home() {
  return (
    <header className="container px-4 min-h-screen supports-[min-height:100dvh]:min-h-[100dvh] grid place-content-center justify-items-center text-center">
      <div className="flex items-center">
        <Library className="w-8 h-8 text-purple-800 mr-2" /> <p className="text-3xl text-purple-800 font-bold">Bookshelf</p>
      </div>
      <h1 className="text-3xl text-slate-900 font-extrabold mt-3">Your virtual library</h1>
      <p className="text-slate-700 mt-2">Catalog and organize library or book collection on multiple virtual bookshelves.</p>
      <Link
        href="/list"
        className="inline-flex items-center h-11 py-2 px-4 rounded-md bg-purple-700 text-white font-medium hover:bg-purple-600 hover:shadow-xl mt-5"
      >
        Get Started
      </Link>
    </header>
  );
}
