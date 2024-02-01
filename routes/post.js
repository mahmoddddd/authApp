const router = require('express').Router()
const { publicPosts, privetPosts } = require('../db')
const JWT = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth')


router.get('/public', (req, res) => {
    res.json(publicPosts).status(200)
})


router.get('/privet', checkAuth, (req, res) => {
    res.json(privetPosts).status(200)

})

module.exports = router