const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});

class Book{
    static async getAllBooks(){
        const result = await pool.query('SELECT * FROM books');
        return result.rows;
    }
}

module.exports = Book;