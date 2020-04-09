const _ = require('lodash');
var mongoose = require('mongoose');
const encrypt = require('../utils/encrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        required: 'Dirección de correo es requerida'
    },
    password: { 
        type: String,
        required : 'Contraseña es requerida'
    },
    salt: {
        type: String,
        required: "Salt no generado"
    },
    name: {
        type: String,
        required: 'Nombre es requerido'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});


UserSchema.methods = {
    authenticate: function (_password, _sal) {
        return this.encryptPassword(_password) === this.password;
    },
    encryptPassword: function (password) {
        return encrypt.encryptPasswordWithSalt(password, this.salt);
    }
};

UserSchema.statics = { 
    signUp: function (userData, callback) {

        const User = this;
        const { email } = userData;

        return User.load({ criteria: { email } })
        .then(function (user) {

            if(user) {
                return Promise.reject('Esta dirección de correo ya esta registrada');
            }
            userData.salt =  encrypt.generateSalt();
            userData.password = encrypt.encryptPasswordWithSalt(userData.password, userData.salt);
            const newUser = new User(userData);
            return newUser.save(callback);
        });

    },
    signIn: function(email, password) {
        const User = this;

        return User.load({ criteria: { email } })
        .then(function(user) {
            if (!user) {
                return Promise.reject('El correo que has introducido no coincide con niguna cuenta.');
            }
            if (!user.authenticate(password)) {
                return Promise.reject('La constraseña que has introducido es incorrecta.');
            }
            return user.save();
        });
    },
    load: function(options) {
        options = options || {};
        return this.findOne(options.criteria)
            .select(options.select)
            .exec();
    }
};



module.exports = mongoose.model('user', UserSchema);