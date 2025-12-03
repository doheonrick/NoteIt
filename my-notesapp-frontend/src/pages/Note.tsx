import { useParams, Link, useNavigate } from "react-router-dom";
import type { Note } from "../types/note";
import { useEffect, useState } from "react";
import { getNote, deleteNote } from "../../services/notes";

export default function Note() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  
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
  const handleDeleteNote = async () => {
            try {
                // Call API
                if (!id) throw Error("Missing Note Id");
                await deleteNote(id);
    
                // After delete, go back to home
                navigate("/");
            } catch (err) {
                console.log("err: ", err);
            }
        }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-slate-800 dark:text-slate-200">
        <h1 className="text-3xl font-bold mb-4 text-black">{title}</h1>
        <p className="mb-6 text-black">{content}</p>
        <Link
        to="/"
        className="rounded-lg bg-primary px-4 py-2 text-black hover:bg-primary/90">
            ← Back to Notes
        </Link>
        <button onClick={handleDeleteNote} className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Delete
        </button>
    </div>
  );
}
