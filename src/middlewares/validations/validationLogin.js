const { check, validationResult, body } = require('express-validator')
const bcrypt = require("bcryptjs");
const db = require('../../database/models');

module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Type a email')
    .isEmail()
    .withMessage('The email isnt valide'),

    check('password')
    .notEmpty()
    .withMessage('Type a password'),

    body('password')
    .custom( (value, {req})=>{
        return db.Users.findOne({
            where:{
                email:req.body.email,
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value, user.password)) {
                return Promise.reject('The mail or password arent invalid');
            }
        })
    })
]