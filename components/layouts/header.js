"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

const NAV_LINKS = [
  { name: "Reading List", href: "/list" },
  { name: "Finished Books", href: "/finished" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b shadow-sm">
      <nav className="container p-4 flex items-center gap-4">
        <Link href="/" className="text-xl text-purple-800 font-bold mr-auto">
          {"<Bookshelf/>"}
        </Link>
        {NAV_LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn("text-sm text-slate-700 font-medium hover:text-purple-500", { "text-purple-500": item.href === pathname })}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
