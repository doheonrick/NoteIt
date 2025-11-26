import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../services/notes";

  

const CreateNote: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    const handleSave = async () => {
    // TODO: implement save functionality
    if (!title.trim() && !content.trim()) {
        alert("Cannot save empty note");
        return;
      }
    
      try {
        const noteId = Date.now(); // Make new id on Frontend
        console.log("noteId: ", noteId);
    
        const newNote = await addNote({
          noteId,
          title,
          content,
          // image: "" // No image yet
        });
    
        console.log("Created Note:", newNote);
    
        navigate("/"); // move to home after save
      } catch (err) {
        console.log(err);
        alert("Failed to save note");
      }
  };

  const handleDiscard = () => {
    // TODO: implement discard functionality
    navigate("/");
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
                  xmlns="http://www.w3.org/2000/svg"
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
                <a
                  href="#"
                  className="text-sm font-medium text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Notes
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Notebooks
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Tags
                </a>
              </nav>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDai7bqPEEfkq82XfOy14Cjt1q39P7Eh4TA0yNCTiXHK_BQpai6iSCXV8i8thn4D7YC9f9NQZc43cuURo9XVS7kcQCt4TvqHpvj41JU8V01PSgJXsxordDxCbHD8vFRAvRXoO0kt91utC9UxKuyUYECtTVxJUC8Ck_g5ejt5Czmpesom48iD7_8j-6VwZLkFaqmGXCtlPm8mlGEV8B6nnWuZqul6qlzSlrqaKIOhz_IUAR6UQlswaNXE0cDjiVfYTHMWeTspI4H0zyt')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <label htmlFor="note-title" className="sr-only">
              Title
            </label>
            <input
                id="note-title"
                name="note-title"
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input ..."
            />
          </div>

          <div>
            <label htmlFor="note-content" className="sr-only">
              Content
            </label>
            <textarea
                id="note-content"
                name="note-content"
                rows={15}
                placeholder="Start writing here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea ..."
            ></textarea>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4">
            <button
              onClick={handleDiscard}
              className="px-6 py-2 rounded-lg text-sm font-semibold text-background-dark dark:text-background-light bg-background-light/80 dark:bg-background-dark/80 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg text-sm font-semibold text-background-dark dark:text-background-light bg-background-light/80 dark:bg-background-dark/80 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateNote;
