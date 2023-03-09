/**
 * index.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com | ewb0020@auburn.edu
 * @Version - 9 MAR 23
 *
 * Run AUttendance frontend
 */

// Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');

// Configuration
// const config = require('./config');

// Create app
let app = express();

// Get build directories
const public = path.normalize(path.join(__dirname, '../public'));
const quiz_creation = path.normalize(path.join(__dirname, '../quiz_creation', 'build'));

// Configure build directories
app.use(express.static(public));
app.use(express.static(quiz_creation));

app.get('/', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(quiz_creation, 'index.html'));
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

