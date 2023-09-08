import { NextResponse } from "next/server";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const finished = searchParams.get("finished") ? searchParams.get("finished").toLowerCase() === "true" : false;
  const books = [];
  const q = query(collection(db, "books"), where("finished", "==", finished));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    books.push({ id: doc.id, ...doc.data() });
  });

  return NextResponse.json(books);
}
