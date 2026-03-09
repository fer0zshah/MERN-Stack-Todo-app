const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();

// 1. Database Connection
require("./conn/conn");

// 2. Middleware (MUST be above routes)
app.use(express.json());
app.use(cors()); // Place this above your routes

// 3. Import Routes
// Ensure the path to auth.js is correct!
const auth = require("./routes/auth");
const list = require("./routes/list");
// 4. Use Routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// 5. Basic Test Route
app.get("/", (req, res) => {
    res.send("Server is working!");
});

// app.listen(3000, () => {
//     console.log('Server is running');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});