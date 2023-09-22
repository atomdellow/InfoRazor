const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());


async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/textsaver', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Successfully connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1); // Exit the process with a failure code
    }
  }
  
  // Call the asynchronous function to connect to the database
  connectToDatabase();

// Define Schema
const TextSchema = new mongoose.Schema({
  text: String,
  category: String
});

// Create Model
const Text = mongoose.model('Text', TextSchema);

// Define API Endpoint
app.post('/save-text', async (req, res) => {
  try {
    const { text, category } = req.body;
    const newText = new Text({ text, category });
    await newText.save();
    res.status(200).json({ message: 'Text saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Define API Endpoint to retrieve texts
app.get('/get-texts', async (req, res) => {
    try {
      const texts = await Text.find({});
      res.status(200).json(texts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
