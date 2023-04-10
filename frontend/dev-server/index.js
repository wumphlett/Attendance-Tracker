/**
 * App.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com | ewb0020@auburn.edu
 * @Version - 22 MAR 23
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
const public = path.normalize(path.join(__dirname, './public'));
const authentication = path.normalize(path.join(__dirname, '../packages/authentication', 'build'));
const homescreen = path.normalize(path.join(__dirname, '../packages/homescreen', 'build'));
const quiz_creation = path.normalize(path.join(__dirname, '../packages/quiz-creator', 'build'));

// Configure build directories
// app.use(express.static(public));
app.use(express.static(homescreen));
app.use(express.static(quiz_creation));
app.use(express.static(authentication));


app.get('/', (req, res) => {
    res.sendFile(path.join(homescreen, 'index.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(quiz_creation, 'index.html'));
});

app.get('/authentication/*', (req, res) => {
    res.sendFile(path.join(authentication, 'index.html'));
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

