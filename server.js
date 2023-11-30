const express = require('express'); 
const mysql = require('mysql'); 

const PORT = process.env.PORT || 3001; 
const app = express (); 

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root123',
    database: 'satellite_db',
  },
  console.log(`Connected to the Satellite_db database.`)
);
