const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Input email correctly')
        .custom(async(value, {req}) => {
        try {
            const user = await User.findOne({email: value});
            if (user) {
                return Promise.reject('This email is already exist');
            }
        } catch (e) {
            console.log(e);
        }
    })
        .normalizeEmail(),
    body('password', 'Password should be longer then 6 letters')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password should be identify');
        }
        return true;
    })
        .trim(),
    body('name')
        .isLength({min: 3})
        .withMessage('Name should be longer then 3 symbols')
        .trim(),

];

exports.courseValidators = [
    body('title').isLength({min: 3})
        .withMessage('Minimal length name of course is 3')
        .trim(),

    body('price').isNumeric()
        .withMessage('Input your price correctly'),

    body('img', 'Input correctly Url')
        .isURL()
];