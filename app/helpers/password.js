import bcrypt from "bcrypt";

class Password {
    constructor() {

    }

    static hashPassword (string, callback) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return callback(error);

            bcrypt.hash(string, salt, (error, hash) => {
                return callback(error, hash);
            });
        });
    }

    static checkPassword (password, userPassword, callback) {
        bcrypt.comapre(password, userPassword, (error, isMatch) => {
            if (error) return callback(error);

            return callback(null, isMatch);
        });
    }


}

module.exports = Password;
