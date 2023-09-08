import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import { cn } from "@/utils";

export default function BookFormDialog() {
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    published_date: "",
    cover_url: "",
    finished: false,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formValues.title.trim() === "") return;
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "books"), {
        ...formValues,
        cover_url: formValues.cover_url.trim() !== "" ? formValues.cover_url : "https://fakeimg.pl/331x499?text=Cover&font=bebas",
        createdAt: serverTimestamp(),
      });

      setOpen(false);
      toast.success("Book added successfully");
      mutate("/api/books");
      setFormValues({
        title: "",
        author: "",
        published_date: "",
        cover_url: "",
        finished: false,
      });
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center h-10 py-2 px-3 rounded-md bg-purple-700 text-white text-sm font-medium md:text-base">
          Add a Book
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 fixed inset-0 w-full h-full backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-lg text-slate-900 font-semibold">Add a New Book</Dialog.Title>
          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            <fieldset className="space-y-1">
              <label className="text-slate-700 text-sm font-medium select-none" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                placeholder="Book title"
                required
                className={cn("form-control", "w-full")}
                value={formValues.title}
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset className="space-y-1">
              <label className="text-slate-700 text-sm font-medium select-none" htmlFor="author">
                Author
              </label>
              <input
                id="author"
                name="author"
                placeholder="Author"
                required
                className={cn("form-control", "w-full")}
                value={formValues.author}
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset className="space-y-1">
              <label className="text-slate-700 text-sm font-medium select-none" htmlFor="published-date">
                Published date
              </label>
              <input
                type="date"
                id="published-date"
                name="published_date"
                required
                className={cn("form-control", "w-full")}
                value={formValues.published_date}
                onChange={handleInputChange}
              />
            </fieldset>
            <fieldset className="space-y-1">
              <label className="text-slate-700 text-sm font-medium select-none" htmlFor="cover">
                Cover URL <span className="text-xs ml-0.5">(Optional)</span>
              </label>
              <input
                type="url"
                id="cover"
                name="cover_url"
                placeholder="Enter cover image URL"
                className={cn("form-control", "w-full")}
                value={formValues.cover_url}
                onChange={handleInputChange}
              />
            </fieldset>
            <div className="flex justify-end pt-3">
              <button
                className="inline-flex items-center h-10 py-2 px-3 rounded-md bg-purple-700 text-white text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add a Book"}
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-slate-700 hover:bg-slate-100 absolute top-[10px] right-[10px] inline-flex w-7 h-7 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5 " />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
