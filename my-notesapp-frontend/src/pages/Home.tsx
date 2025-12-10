import type { Note } from "../types/note";
import { Link, useNavigate } from "react-router-dom";
import { getAllNotes, getNote, deleteNote, addNote, patchNote } from "../../services/notes";
import { useEffect, useState } from "react";
import { __unstable__loadDesignSystem } from "tailwindcss";


export default function Home() {
    // Use useState to set variables
    const navigate = useNavigate();

    const [notes, setNotes] = useState<Note[]>([]);
    const [oneNote, setOneNote] = useState<Note[]>([]);

    // use useEffect to call something when a page loads (or variable change but we haven't learned this yet)
    useEffect(() => {
        handleGetAllNotes();
        console.log("notes: ", notes);
    }, []);

    // function that calls API
    const handleGetAllNotes = async () => {
        try {
            // Call API
            const res = await getAllNotes();

            // set variable with data
            setNotes(res.data);
        } catch (err) {
            console.log("err: ", err);
        }
    }

    const handleGetNote = async () => {
        try {
            // Call API
            const res = await getNote("1");

            // set variable with data
            setOneNote(res.data);
            console.log("Note 1: ", res.content);
        } catch (err) {
            console.log("err: ", err);
        }
    }

    const handleAddNote = async () => {
        try {
            navigate("/new-note");
        } catch(err) {
            console.log("Error adding note:", err);
        }
    }

    const handlePatchNote = async () => {
        try {
            const res = await patchNote({
            noteId: 4,
            title: "Updated title",
            content: "Updated content"
            });
            console.log("Patch result:", res);
        } catch(err) {
            console.log("Error patching note:", err);
        }
    }


  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/80 bg-background-light/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-xl">description</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">NoteIt</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200/50">
            <span className="material-symbols-outlined">search</span>
          </button>
          <div
            className="size-10 rounded-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://i.pravatar.cc/100')" }}
          />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Title + Button */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-primary/90" onClick={handleAddNote}>
              Add Note
            </button>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          </div>
            <h2 className="text-3xl font-bold text-slate-900">My Notes</h2>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(notes) && notes.map((note) => (
            <Link
                key={note.id}
                to={`/note/${note.id}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-xl block"
            >
                <img
                    src={note.image}
                    alt={note.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-lg font-bold text-white">{note.title}</p>
                </div>
            </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}