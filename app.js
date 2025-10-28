require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: process.env.SESSION_SECRET || 'secretkey123',
	resave: false,
	saveUninitialized: true,
}));
app.use(flash());

app.get('/', (req, res) => {
	return res.redirect('/login');
});

app.get('/login', (req, res) => {
	const success = req.flash('success') || [];
	const message = req.flash('message') || [];
	const errors = req.flash('errors') || [];
	const signupLink = '/signup';
	res.render('login', { success, message, errors, signupLink });
});

app.get('/signup', (req, res) => {
	const message = req.flash('message')?.[0] || '';
	res.render('signup', { message, formData: {}, csrfToken: '' });
});

app.get('/forgotpassword', (req, res) => {
	const success = req.flash('success') || [];
	const message = req.flash('message')?.[0] || '';
	res.render('forgotpassword', { success, message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;