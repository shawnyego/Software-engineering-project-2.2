const express = require('express');
const mysql = require('mysql'); // Definitely change this to mongoose since you're using MongoDB
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trsteerr',
    port: 3306
});
/* connect do mongoDB you can ignore mysql connection
mongoose.connect('mongodb://localhost:27017/propertyDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));
    */

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the HTML form
app.get('/add-property', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewsdemo.html')); // Adjust the path if necessary
});

// Handle form submission
app.post('/add-property', (req, res) => {
    console.log('Received request body:', req.body); // Logs   you can remove this line

    const { title, description, videoUrl, rooms, bathrooms, rent, county, location } = req.body;

    // Here you'll need to change it manually or argue back and forth with blackbox. from here we go to fetching Properties
    if (!title || !description || !videoUrl || !rooms || !bathrooms || !rent || !county || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate the video URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/; // Url Validation
    if (!urlPattern.test(videoUrl)) {
        return res.status(400).json({ message: 'Invalid video URL format' });
    }

    const sql = 'INSERT INTO properties (title, description, videoUrl, rooms, bathrooms, rent, county, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [title, description, videoUrl, rooms, bathrooms, rent, county, location], (err, results) => {
        if (err) {
            console.error('Error adding property:', err);
            return res.status(500).json({ message: 'Error adding property' });
        }
        res.json({ message: 'Listing added successfully', data: req.body });
    });
});
// Endpoint to fetch properties
app.get('/properties', (req, res) => {
    const sql = 'SELECT * FROM properties';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});
/*
 The following is the code for fetching properties from MongoDB

app.get('/properties', (req, res) => {
    Property.find()
        .then(properties => res.json(properties))
        .catch(err => res.status(500).json({ message: 'Error fetching properties', error: err }));
});

*/

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
/*
example of a mongoDb schema
const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    rent: { type: Number, required: true },
    county: { type: String, required: true },
    location: { type: String, required: true }
});

// Create a model based on the schema
const Property = mongoose.model('Property', propertySchema);

*/

/*

Now since you're here, the rest is the complete code

NOTE: this only allows Posting and displaying property data


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/propertyDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the property schema
const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    rent: { type: Number, required: true },
    county: { type: String, required: true },
    location: { type: String, required: true }
});

// Create a model based on the schema
const Property = mongoose.model('Property', propertySchema);

// Route to add a property
app.post('/add-property', (req, res) => {
    const {

    */

