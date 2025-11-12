import { useParams, Link } from "react-router-dom";
import type { Note } from "../types/note";
import { useEffect, useState } from "react";
import { getNote } from "../../services/notes";

export default function Note() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  useEffect(() => {
          handleGetNotes();
      }, []);

  const handleGetNotes = async () => {
          try {
              // Call API
              if (!id) throw Error("Missing Note Id");
              const res = await getNote(id);
  
              // set variable with data
              setTitle(res.title);
              setContent(res.content);

              console.log("Note : ", res.title, res.content); 
          } catch (err) {
              console.log("err: ", err);
          }
      }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-6">{content}</p>
      <Link
        to="/"
        className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        ← Back to Notes
      </Link>
    </div>
  );
}
