import { useState } from "react";
import { BookOpen, Trash } from "lucide-react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { formatDate } from "@/utils";
import { db } from "@/lib/firebase";

export default function BookCard({ book }) {
  const { mutate } = useSWRConfig();
  const [isUpdating, setisUpdating] = useState();

  async function deleteBook(docId) {
    try {
      await deleteDoc(doc(db, "books", docId));
      toast.success("Book deleted successfully");
      mutate("/api/books");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  }

  async function updateReadStatus(book) {
    const bookRef = doc(db, "books", book.id);

    try {
      setisUpdating(true);
      await updateDoc(bookRef, {
        finished: !book.finished,
      });
      toast.success("Succeed");
      mutate("/api/books");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setisUpdating(false);
    }
  }

  return (
    <div key={book.id} className="bg-white shadow-md sm:flex rounded-md overflow-hidden">
      <div className="md:shrink-0 p-3 sm:p-2">
        <img src={book.cover_url} alt={book.title} className="max-w-[142px] max-h-[212px] object-cover mx-auto sm:mx-0" />
      </div>
      <div className="pt-1 pb-6 px-4 sm:p-6 flex flex-col items-center sm:items-stretch">
        <h2 className="text-slate-900 font-medium text-xl">{book.title}</h2>
        <p className="text-sm mt-0.5">
          <span className="text-slate-700">By</span> <span className="text-indigo-500 font-medium">{book.author}</span>
        </p>
        <p className="text-slate-700 text-sm mt-2 hidden sm:block">Published date: {formatDate(book.published_date)}</p>
        <div className="flex items-end gap-2 flex-1 pt-6 sm:pt-0">
          <button
            disabled={isUpdating}
            onClick={() => updateReadStatus(book)}
            className="inline-flex items-center py-2 px-2 rounded-md bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-medium whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            Mark as {book.finished ? "unread" : "read"}
          </button>
          <button
            onClick={() => {
              if (confirm("Are you absolutely sure?")) deleteBook(book.id);
            }}
            className="inline-flex items-center py-2 px-2 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Trash className="w-4 h-4 mr-1.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
