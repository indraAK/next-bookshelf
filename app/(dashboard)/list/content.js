"use client";

import useSWR from "swr";
import BookFormDialog from "@/components/book-form-dialog";
import Spinner from "@/components/spinner";
import BookList from "@/components/book-list";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PageContent() {
  const { data: books, error, isLoading } = useSWR("/api/books", fetcher);

  return (
    <main className="container px-4 pt-6 pb-10">
      <h1 className="text-center text-2xl text-slate-900 font-bold">Reading List</h1>
      <div className="flex justify-end mt-8">
        <BookFormDialog />
      </div>
      {error && !isLoading && <p className="text-slate-700 text-center mt-10">Failed to fetch the data!</p>}
      {isLoading && (
        <div className="flex justify-center mt-14">
          <Spinner />
        </div>
      )}
      {books !== undefined && books?.length > 0 && <BookList data={books} className="mt-8" />}
      {books !== undefined && books?.length === 0 && <p className="text-slate-700 text-center mt-10">There are no reading list yet</p>}
    </main>
  );
}
