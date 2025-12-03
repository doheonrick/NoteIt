import fs from 'fs';
import path from 'path';
import notes from '../mockDB/notes.json' with { type: 'json' };

// API to get Note Data
const getNote = async (req, res) => {
    // Get note id from url
    // This is how we know which note to get
    const { noteId } = req.params;

    // Always use a try catch block to contain errors
    try {
        let title = "";
        let content = "";

        for (let i = 0; i < notes.length; i++)
            {
                if (notes[i].id === Number(noteId)) {
                    title = notes[i].title;
                    content = notes[i].content;
                    break;
                }
            }

        console.log("title: ", title);
        console.log("content: ", content);
        
        if (title === "" || content === ""){
            return res.status(400).json({message: "Empty title, content"});
        }
        // We will return a ok status with the title and content
        // It should look similar to this:
        // {
        //     "title": "Grocery List",
        //     "content": "Eggs, Milk, Kimchi"
        // }
        res.status(200).json({ title: title, content: content});
    } catch (err) {

        // If there is an error, we want to see it so we console.log
        // This is only for development, in production remove it
        console.log("error: ", err);

        // Return error status and error message
        res.status(500).json({error: "Error getting note info"})
    }
};

// Procedure of getting all notes and sending to frontend
const getAllNotes = async (req, res) => {
    try {
        res.status(200).json({ data: notes})
    } catch (err) {
        // If there is an error, we want to see it so we console.log
        // This is only for development, in production remove it
        console.log("error: ", err);

        // Return error status and error message
        res.status(500).json({error: "Error getting all notes"})
    }
}

const addNote = async (req, res) => {
    // What do we need to add a note? id, title, image, and content
    // How do we get it? User input!

    // This will grab the data from the user request
    const {noteId, title, image, content} = req.body;

    try {
        // Since the database only takes data in specific format, we have to transform the data

        // We create a data object
        const data = {
            id: noteId,
            title: title,
            image: image,
            content: content
        };
        
        // We have to add the data object
        notes.push(data);
        // How do i update the mockDB?

        // BAD CODE; JUST FOR TESTING

         // Get the full path to the JSON file
         const filePath = path.resolve('./mockDB/notes.json');

         // Write the updated notes array back to the file
         fs.writeFileSync(filePath, JSON.stringify(notes, null, 2), 'utf-8');


        res.status(200).json({message: "Successfully added note", data: data})
    } catch (err) {
        // If there is an error, we want to see it so we console.log
        // This is only for development, in production remove it
        console.log("error: ", err);

        // Return error status and error message
        res.status(500).json({error: "Error adding note info"})
    }
};

// This is a code to delete a note, but it goes one by one so in a real world we do not do this
const deleteNote = async (req, res) => {
 
    const { noteId } = req.params;

    try {
        const numNoteId = Number(noteId);

        const updatedNotes = notes.filter(note => note.id !== numNoteId);

        // update in-memory notes
        notes.length = 0;
        updatedNotes.forEach(n => notes.push(n));

        // then update the file
        const filePath = path.resolve('./mockDB/notes.json');
        fs.writeFileSync(filePath, JSON.stringify(updatedNotes, null, 2), 'utf-8');

        res.status(200).json({message: "Successfully deleted note"});
    } catch (err) {
        console.log("error: ", err);
        res.status(500).json({error: "Error deleting note info"});
    }
};

const patchNote = async (req, res) => {
   
    //get note id from url
    const { noteId } = req.params;
    const { title, image, content } = req.body;

  try{

        const index = notes.findIndex(note => note.id === Number(noteId));

        if (title) notes[index].title = title;
        if (image) notes[index].image = image;
        if (content) notes[index].content = content;

        //Check the updated data
        console.log("Updated note: ", notes[index]);

        // Get full path to notes.json file
        const filePath = path.resolve('./mockDB/notes.json');

        // Write updated notes array back to the file
        fs.writeFileSync(filePath, JSON.stringify(notes, null, 2), 'utf-8');

        res.status(200).json({message: "Successfully edited note"})

  } catch (err) {

        console.log("error ", err);
        res.status(500).json({error: "Error editing note info"})
  }
};

export { getNote, getAllNotes, addNote, deleteNote, patchNote }