const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const constants = require('../../constants/index');

const check = (req, res, next) => {
    const authHeader = req.get('Authorization');

    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, config.jwt.secretKey);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403);
        }
    }
    const user = jwt.decode(token, config.jwt.secretKey);
    //console.log(user.userData.role);
    req.user = user;
    next();
}



module.exports = {
    check
};