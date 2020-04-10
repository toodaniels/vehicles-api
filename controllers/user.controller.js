var User = require('../models/user.model');
const jwt = require('../utils/jwt'); 

const signUp =  async ( req, res ) =>{
    const { body } = req;
    try {
        const result = await User.signUp(body);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json(err);
    }
}

const signIn = async ( req, res ) =>{
    const { body: {email, password} } = req;
    try {
        const userResult = await User.signIn(email, password);
        const user = userResult.toObject();
        const token = await jwt.generateToken(user);
        res.status(200).json({ ...user, token });
    }catch (e) {
        res.status(400).json(e);
    }
    
}

module.exports = {
    signUp,
    signIn
}