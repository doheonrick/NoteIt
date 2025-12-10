import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNote, deleteNote, patchNote } from "../../services/notes";

export default function Note() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetNotes();
  }, []);

  const handleGetNotes = async () => {
    try {
      if (!id) throw Error("Missing Note Id");
      const res = await getNote(id);

      setTitle(res.title);
      setContent(res.content);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleDeleteNote = async () => {
    try {
      if (!id) throw Error("Missing Note Id");
      await deleteNote(id);
      navigate("/");
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleSaveNote = async () => {
    try {
      if (!id) throw Error("Missing Note Id");

      await patchNote({ noteId: Number(id), title, content });

      setIsEditing(false);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-background-light/10 dark:border-background-dark/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-primary">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-background-dark dark:text-background-light">
                NoteIt
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                <a className="text-sm font-medium text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Notes
                </a>
                <a className="text-sm font-medium text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Notebooks
                </a>
                <a className="text-sm font-medium text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Tags
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">

          {/* Note Card */}
          <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-xl shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                {isEditing ? (
                  <input
                    className="w-full text-4xl font-bold text-slate-900 dark:text-white mb-2 border-2 border-primary/50 rounded-lg px-3 py-2 focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {title || "Untitled Note"}
                  </h2>
                )}

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Last edited recently
                </p>
              </div>

              {isEditing ? (
                <textarea
                  className="w-full min-h-[200px] text-base border-2 border-primary/50 rounded-lg p-4 text-slate-800 dark:text-slate-200 bg-white dark:bg-background-dark focus:outline-none leading-relaxed"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {content}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="bg-background-light dark:bg-background-dark/50 border-t border-black/10 dark:border-white/10 
                            px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-end 
                            space-y-3 sm:space-y-0 sm:space-x-4 rounded-b-xl">

              {isEditing ? (
                <button
                  onClick={handleSaveNote}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 
                            rounded-lg font-semibold text-sm bg-primary text-white hover:bg-opacity-90 
                            transition-opacity duration-200"
                >
                  <span className="text-black">Save</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 
                            rounded-lg font-semibold text-sm bg-primary/10 dark:bg-primary/20 text-primary 
                            hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-200"
                >
                  <span className="text-black">Edit</span>
                </button>
              )}

              <button
                onClick={handleDeleteNote}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 
                          rounded-lg font-semibold text-sm bg-primary text-white hover:bg-opacity-90 
                          transition-opacity duration-200"
              >
                <span className="text-black">Delete</span>
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
