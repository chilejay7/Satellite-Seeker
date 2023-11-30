const express = require('express'); 


const PORT = process.env.PORT || 3001; 
const app = express (); 

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

