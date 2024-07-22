const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5501;

app.use(cookieParser());
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5501',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

const JWT_SECRET = process.env.JWT_SECRET || 'OTADEKTDySgCdhpbVMlb'; 

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
    role: { type: String, default: 'student' },
    class: { type: String, default: 'no_class' }
});

const QuestionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: Number,
    testName: String, 
    testClass: String 
});

const User = mongoose.model('User', UserSchema);
const Question = mongoose.model('Question', QuestionSchema);

app.post('/register', async (req, res) => {
    console.log('Received register request:', req.body);
    const { name, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

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
        res.cookie('userId', user.id, { httpOnly: false,secure: true,path: '/',sameSite: "none" });
        res.cookie('token', token, { httpOnly: false,secure: true,path: '/',sameSite: "none" });
        if(user.role == "admin") {
            res.json({ message: 'Login successful', userId: user.id, token, redirectUrl: '/frontend/html/admin.html' }); 
        } else if(user.role == "teacher"){
            res.json({ message: 'Login successful', userId: user.id, token, redirectUrl: '/frontend/html/teacher.html' }); 
        }
        else {
            res.json({ message: 'Login successful', userId: user.id, token, redirectUrl: '/frontend/html/main.html' }); 
        } 
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ message: error.message });
    }
});

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
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

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId, userRole: req.userRole });
});

app.get('/user-info', authMiddleware , async (req, res) => {
    try {
        const user = await User.find({id: req.userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/update-user/:id', async (req, res) => {
    try {
        const { name, email, role, class: userClass } = req.body; 
        const { id } = req.params;
        console.log(id);
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, role, class: userClass }, { new: true }); 
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/delete-user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/submit-questions', async (req, res) => {
    try {
        const { questions } = req.body;
        
        if (questions.length > 20) {
            return res.status(400).json({ message: 'Cannot submit more than 20 questions.' });
        }

        await Question.insertMany(questions);
        res.status(201).json({ message: 'Questions submitted successfully' });
    } catch (error) {
        console.error('Error submitting questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
