const express = require('express');
const app = express();
const categoryRoute = require('./routes/category_route');
const todoRoute = require('./routes/todo_route');
const mongoose = require('./database/mongoose');

// ENABLE CORS (Cross Origin Request Security)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Recognize request object as JSON or URL(string).
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Use separate routes for each group of operation
app.use('/api/category', categoryRoute);
app.use('/api/todo', todoRoute);

// Handle default route ( '/' route)
app.get('/', (req, res) => {
    res.send("Welcome to my todo API 👻");
});

// Run the server
app.listen(8080, () => console.log("Server running on port 8080"));