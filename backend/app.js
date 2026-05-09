const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});




const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res;json({mesage: 'Backend running successfully'});
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        return res.json({ message: 'Login successful'});
    }

    res;status(401).json({ message: 'Invalid credentials'});
} );

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});
