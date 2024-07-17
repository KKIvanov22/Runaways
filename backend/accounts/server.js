const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5501;

app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'OTADEKTDySgCdhpbVMlb'; 

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const uri = 'mongodb+srv://Runaways:Run12345@accounts-runaways.eddsdhc.mongodb.net/?retryWrites=true&w=majority&appName=Accounts-runaways';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'student' }
});

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    console.log('Received register request:', req.body);
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const lastUser = await User.findOne().sort({ id: -1 });
        const newId = lastUser ? lastUser.id + 1 : 1;

        const user = new User({ id: newId, name, email, password: hashedPassword, role: 'student' });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    console.log('Received login request:', req.body);
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, redirectUrl: '/frontend/html/main.html' }); // Include redirectUrl
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ message: error.message });
    }
});

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Example protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId, userRole: req.userRole });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
