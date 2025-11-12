import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Note from "./pages/Note";
import CreateNote from "./pages/NewNote";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="note/:id" element={<Note />} />
          <Route path="/new-note" element={<CreateNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
