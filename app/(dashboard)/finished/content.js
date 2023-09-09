"use client";

import useSWR from "swr";
import Spinner from "@/components/spinner";
import BookList from "@/components/book-list";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PageContent() {
  const { data: books, error, isLoading } = useSWR("/api/books?finished=true", fetcher);

  return (
    <main className="container px-4 pt-6">
      <h1 className="text-center text-2xl text-slate-900 font-bold">Finished Books</h1>

      {isLoading && (
        <div className="flex justify-center mt-14">
          <Spinner />
        </div>
      )}

      {books !== undefined && books?.length > 0 && <BookList data={books} className="mt-8" />}
      {books !== undefined && books?.length === 0 && <p className="text-slate-700 text-center mt-8">There are no finished books yet</p>}
    </main>
  );
}
