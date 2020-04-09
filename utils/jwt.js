const jwt = require('jsonwebtoken');

const generateToken = async function(user) {
    const jwtSecret = 'vehicles-api';
    const token = await jwt.sign(user, jwtSecret);
    return token;
}
module.exports = {
    generateToken
}