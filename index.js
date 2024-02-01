const express = require('express');
const app = express();
const auth = require('./routes/auth')
const post = require('./routes/post')
const JWT = require('jsonwebtoken')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/auth', auth)
app.use('/post', post)


app.get('/', (req, res) => {
    res.send("Hello World")
})


port = 3000

app.listen(port, () => {
    console.log(`Server run at ${port}`)
})