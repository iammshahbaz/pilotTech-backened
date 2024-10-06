require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');
const { connection } = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/stocks', stockRoutes);



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to mongodb")
        console.log(`Server is running at 8080`)
    } catch (error) {
        console.log("Error connecting to db")
    }
})
