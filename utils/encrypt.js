const crypto = require('crypto');

const generateSalt =  function() {
    return `${Math.round(new Date().valueOf() * Math.random())}`;
};

const encryptPasswordWithSalt =  function( password, salt ) {
    if (!password) {
        return Promise.reject('La contraseña es requerida');
    }
    try {
        return crypto
            .createHmac('sha1', salt)
            .update(password)
            .digest('hex');
    } catch (err) {
        return Promise.reject('Ocurrió un error intentelo más tarde');
    }
}

module.exports = {
    generateSalt,
    encryptPasswordWithSalt
};