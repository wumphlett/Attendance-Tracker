/**
 * App.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com | ewb0020@auburn.edu
 * @Version - 12 APR 23
 *
 * Run AUttendance frontend
 */

// Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// Functions
// Configuration
// const config = require('./config');

// Create app
let profApp = express();
let responseApp = express();

// Get build directories
const public = path.normalize(path.join(__dirname, './public'));
const homescreen = path.normalize(path.join(__dirname, '../packages/homescreen', 'build'));
const quiz_creation = path.normalize(path.join(__dirname, '../packages/quiz-creator', 'build'));
const presentation = path.normalize(path.join(__dirname, '../packages/presentation', 'build'));
const response = path.normalize(path.join(__dirname, '../packages/response', 'build'));

// Configure build directories
// // app.use(express.static(public));
profApp.use(express.static(homescreen));
profApp.use(express.static(quiz_creation));
profApp.use(express.static(presentation));
responseApp.use(express.static(response));


profApp.get('/', (req, res) => {
    res.sendFile(path.join(homescreen, 'index.html'));
});


profApp.get('/create/*', (req, res) => {
    res.sendFile(path.join(quiz_creation, 'index.html'));
});

profApp.get('/presentation/*', (req, res) => {
    res.sendFile(path.join(presentation, 'index.html'));
});

responseApp.get('/', (req, res) => {
    res.sendFile(path.join(response, 'index.html'));
});

profApp.listen(80, () => {
    console.log("Professor app listening on port 80");
})

responseApp.listen(81, () => {
    console.log("Response app listening on port 80");
})
