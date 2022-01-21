const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

signupUser = function (req, res, next) {
    User.find({ username: req.body.username }).
        then(resault => {
            if (resault.length < 1) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(404).json({
                            massage: err
                        })
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: hash,
                            usermail: req.body.usermail,
                            phone: req.body.phone,
                            birthday: req.body.birthday,
                            gender: req.body.gender,
                        });
                        user.save().
                            then(resault => {
                                console.log(resault);
                                res.status(200).json({
                                    massage: 'User Already Created'
                                })
                            }).
                            catch(err => {
                                res.status(404).json({
                                    massage: err
                                })
                            });
                    }
                })
            } else {
                res.status(404).json({
                    massage: 'User Already Exists'
                })
            }
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        });
}

signinUser = function (req, res, next) {
    User.find({ username: req.body.username }).
        then(user => {
            if (user.length >= 1) {
                bcrypt.compare(req.body.password, user[0].password).
                    then(resault => {
                        if (resault) {
                            const token = jwt.sign({
                                userid: user[0]._id,
                                username: user[0].username,
                                usermail: user[0].usermail,
                            }, 'secret', {
                                expiresIn: '10h'
                            });
                            res.status(200).json({
                                massage: 'Successful Sign In',
                                token: token
                            });
                        } else {
                            res.status(404).json({
                                massage: 'Sign In Failed'
                            });
                        }
                    }).
                    catch(err => {
                        res.status(404).json({
                            massage: err
                        });
                    });
            } else {
                res.status(404).json({
                    massage: 'Wrong User !!!!!'
                });
            }
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

updateUser = function (req, res, next) {
    bcrypt.hash(req.body.password, 10).
        then(hash => {
            const newUser = {
                username: req.body.username,
                password: hash,
                usermail: req.body.usermail,
                phone: req.body.phone,
                birthday: req.body.birthday,
                gender: req.body.gender,
            }
            User.findOneAndUpdate({ _id: req.params.id }, { $set: newUser }).
                then(resault => {
                    if (resault) {
                        res.status(200).json({
                            massage: 'User Already Updated'
                        });
                    } else {
                        res.status(404).json({
                            massage: 'Failed Update User'
                        });
                    }
                }).
                catch(err => {
                    res.status(404).json({
                        massage: err
                    });
                });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

deleteUser = function (req, res, next) {
    User.findOneAndDelete({ _id: req.params.id }).
        then(resault => {
            if (resault) {
                res.status(200).json({
                    massage: 'User Already Deleted'
                });
            } else {
                res.status(404).json({
                    massage: 'Failed Delete User'
                });
            }
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

module.exports = {
    signupUser: signupUser,
    signinUser: signinUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}