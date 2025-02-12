const express = require('express');
const Book = require('./models/book');
require ('dotenv').config();

const app = express();
app.use(express.json());

//EndPoints

app.get('/books', async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.status(200).json(books);
        res.json(books);
    }   catch (error) {        
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} ! `);
});