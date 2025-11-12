const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})