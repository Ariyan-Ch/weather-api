const express = require('express');
const router = express.Router();
const UserCred = require('../schemas/userCred');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

router.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signin.html'));
});


router.post('*', async (req, res) => {

    const { user, password } = req.body;

    try {
        const foundUser = await UserCred.findOne({ name: user });
        if (!foundUser) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        //const isMatch = password===foundUser.password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Password did not match!' });
        }

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.json({ token });
    } catch (error) {
        res.status(500).send("There was an error caught at router.post in signin.js");
    }
});

module.exports = router;