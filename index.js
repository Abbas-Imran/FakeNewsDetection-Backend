const express = require('express');
const { spawn } = require('child_process');
var cors = require("cors");
const helmet = require("helmet");	

require('dotenv').config();

const app = express();
const port = 3000;

const login = require('./routes/Login');
const signup = require('./routes/Register');
const feedBack = require('./routes/Feedback');
const connectDB = require("./db/connect");

// Parse JSON request bodies
app.use(express.json());
app.use(cors());
//Authentication End points
app.use('/login', login);
app.use('/login', login);
app.use('/signup', signup);
app.use('/feedback', feedBack);


app.post('/predict', (req, res) => {
  const text = req.body.text; // Get the input text from the request body

  if (!text) {
    res.status(400).send('Input text is missing');
    return;
  }

  // Spawn a Python process and execute the Python code
  const pythonProcess = spawn('python', ['./predict.py', text]);

  // Collect output from the Python process
  let output = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Handle the end of the Python process
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    console.log(output)
    res.send({result: output});
  });
});

const start = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
