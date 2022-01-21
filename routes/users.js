var express = require('express');
var router = express.Router();
const control = require('../controller/user_control');

//sign up
router.post('/signup', control.signupUser);

//sign in 
router.get('/signin', control.signinUser);

//updata user 
router.patch('/updateuser/:id', control.updateUser);

//delete user
router.delete('/deleteuser/:id', control.deleteUser);

module.exports = router;
