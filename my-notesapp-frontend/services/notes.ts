const PORT = import.meta.env.VITE_PORT
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllNotes = async () => {
    try {
        // This is where we call the API
        const res = await fetch(`${API_BASE_URL}${PORT}/api/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // This is where we mold the data
        const data = await res.json();
        console.log("data: ", data);

        if (!res.ok) throw new Error(data.error);

        // Return the data
        return data;
    } catch (err) {
        console.log("err: ", err);
        throw err;
    }
}

export const getNote = async (id: string) => {
    try {
        // This is where we call the API
        const res = await fetch(`${API_BASE_URL}${PORT}/api/notes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // This is where we mold the data
        const data = await res.json();
        console.log("data: ", data);

        if (!res.ok) throw new Error(data.error);

        // Return the data
        return data;
    } catch (err) {
        console.log("err: ", err);
        throw err;
    }
}

export const deleteNote = async (id: string) => {
    try {
        // This is where we call the API
        const res = await fetch(`${API_BASE_URL}${PORT}/api/notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // This is where we mold the data
        const data = await res.json();
        console.log("data: ", data);

        if (!res.ok) throw new Error(data.error);

        // Return the data
        return data;
    } catch (err) {
        console.log("err: ", err);
        throw err;
    }
}

export const addNote = async (noteData: {
    noteId: number;
    title: string;
    content: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE_URL}${PORT}/api/notes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
  
      const data = await res.json();
      console.log("data:", data);
  
      if (!res.ok) throw new Error(data.error);
  
      return data;
    } catch (err) {
      console.log("err:", err);
      throw err;
    }
  };

export const addNote2 = async (id: string, title: string, content: string, image: string) => {
    try {
        const res = await fetch(`${API_BASE_URL}${PORT}/api/notes/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id, title, content, image}),
        });
    
        const data = await res.json();
        console.log("data:", data);
    
        if (!res.ok) throw new Error(data.error);
    
        return data;
      } catch (err) {
        console.log("err:", err);
        throw err;
      }
}
  
  export const patchNote = async (noteData: {
    noteId: number;
    title: string;
    content: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE_URL}${PORT}/api/notes/${noteData.noteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
  
      const data = await res.json();
      console.log("data:", data);
  
      if (!res.ok) throw new Error(data.error);
  
      return data;
    } catch (err) {
      console.log("err:", err);
      throw err;
    }
  };