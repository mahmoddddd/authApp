const JWT = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    const authToken = req.header('x-auth-token');

    if (!authToken) {
        return res.status(400).json({ msg: 'No token provided' });
    }

    try {
        const user = await JWT.verify(authToken, 'sdsddssdd656dssd65ds6ds6ds56ds56ds68ds6ds');
        req.user = user.email;
        next();
    } catch (error) {
        return res.status(400).json({ msg: 'Invalid token' });
    }
}


