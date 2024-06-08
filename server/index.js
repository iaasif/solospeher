const express = require("express");
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 9000;

const app = express();


// here origin will be the website , which will send and recive data using cors 

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5173',],
    credentials: true,
    optionSuccessStatus: 200,
}
// cors connect server and browser , for data passing 
app.use(cors(corsOptions))

// convert file from client side 
app.use(express.json());

app.listen(port, ()=>{
    console.log(`server is runnig bro ${port}`);
})