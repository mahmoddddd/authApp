const router = require('express').Router();
const { check, validationResult } = require('express-validator')
const { users } = require('../db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth')

router.post('/signup',
    [
        check("email", "Enter a valid email")
            .isEmail(),
        check("password", "Enter a valid password").isLength({ min: 5 })
            .isLowercase().
            trim()
    ],
    async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array()
                })
        }

        let user = users.find((user) => {
            return user.email === email
        })

        if (user) {
            return res
                .status(400)
                .json({
                    "errors": [
                        {
                            "msg": "'User already exists"
                        }
                    ]
                })
        }

        let hashedPassword = await bcrypt.hash(password, 12);

        users.push({
            email: email, // in ecma6 we can write just <>  email,
            password: hashedPassword
        });

        const token = await JWT.sign({
            email
        }, "sdsddssdd656dssd65ds6ds6ds56ds56ds68ds6ds",
            { expiresIn: 6565656 })

        res.json({
            token
        })
    })


router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    let user = users.find((user) => {
        return user.email === email;
    })

    if (!user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": " No user with this email "
                }]
        })
    }
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res
            .status(400).json({
                "errors": [
                    {
                        "msg": "enter a correct password"
                    }
                ]
            })
    }
    const token = await JWT.sign({
        email
    }, "sdsddssdd656dssd65ds6ds6ds56ds56ds68ds6ds",
        { expiresIn: 6565656 })

    res.json({
        token
    })
})


router.get('/all', (req, res) => {
    res.json(users)
})
module.exports = router











