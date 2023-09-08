import BookCard from "./book-card";
import { cn } from "@/utils";

export default function BookList({ data, className }) {
  return (
    <div className={cn("grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_400px),_1fr))] gap-4", className)}>
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
