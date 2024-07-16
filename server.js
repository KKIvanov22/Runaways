const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5501;

app.use(bodyParser.json());
app.use(cors());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const uri = 'mongodb+srv://Runaways:Run12345@accounts-runaways.eddsdhc.mongodb.net/?retryWrites=true&w=majority&appName=Accounts-runaways';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'student' } // Add role field with default value
 });
    

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    console.log('Received register request:', req.body); // Debug log
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        const user = new User({ name, email, password, role: 'student' }); // Set role to 'student'
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error); // Debug log
        res.status(400).json({ message: error.message });
    }
});


app.post('/login', async (req, res) => {
    console.log('Received login request:', req.body); // Debug log
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Return a JSON response indicating a successful login and redirect URL
        res.json({ message: 'Login successful', redirectUrl: '/html/main.html' }); 
    } catch (error) {
        console.error('Error during login:', error); // Debug log
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
