const express = require('express');
const router = express.Router();
const UserCred = require('../schemas/userCred.js');
const path = require('path');


router.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signUP.html'));
});


router.post('*', async (req, res) => {
    try{
        const userNameRecieved = req.body.user;
        const passwordRecieved = req.body.password;
        const newUser = new UserCred({
            name: userNameRecieved,
            password: passwordRecieved
        })
        newUser.save().then( () => {
            console.log("Saved User Credentials.");
            res.json({"message":"Successful!"});
        }).catch((err) => {
            console.log("Error while Saving Credentials: ", err );
            res.json({"message":"Failed!"});
        });

    } catch (err){
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;