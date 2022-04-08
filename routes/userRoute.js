const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require("../config/keys");
const User = require("../model/User");
const {validateUserSignup, validateUserLogin} = require("../validation/user");

const router = express.Router();

router.post("/", (req, res) => {
    const { errors, isValid } = validateUserSignup(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.find({}).then(user => {
        if(user) {
            User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    errors.email = 'Email already exists';
                    return res.status(400).json(errors);
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                        });
                    });
                }
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    })
})

router.post('/login', async(req, res) => {
    const {errors, isValid} = validateUserLogin(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).json({ email: 'Email is incorrect' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(isMatch) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 7200 },
            (err, token) => {
                return res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
    } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
    }
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    });
});

router.get('/', passport.authenticate('jwt', { session: false }), async(req, res) => {
    const users = await User.find({ role: 'user' });
    return res.json(users);
})

router.put('/:id', passport.authenticate('jwt', { session: false }), async(req, res) => {
    const user = await User.findById(req.params.id);
    await user.remove();
    return res.json({ success: true });
})

module.exports = router;