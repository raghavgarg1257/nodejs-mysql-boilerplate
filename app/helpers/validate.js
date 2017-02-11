"use strict";

import { isEmpty, isHexadecimal, isLength, matches, trim } from 'validator';

class Validate {

    static sanitize(val) {
        // we can add more sanitization rules
        // refer https://www.npmjs.com/package/validator#sanitizers
        return trim(val);
    }

    static isName(name) {
        if ( !isEmpty(name) && matches(name, /^[0-9a-z \']+$/i)) return true;
        else return false;
    }

    static isID(id) {
        if (isLength(id, 32) && isHexadecimal(id)) return true;
        else return false;
    }

    // Model: where you want to find uniqueness
    // attribute: with what field of model you want to uniqueness
    // value: user's input value
    // countWhat: primary key field of the model to count number of records
    static isExist(Model, attribute, value, countWhat) {
        return new Promise( (resolve, reject) => {
            Model.where(attribute, value).count(countWhat)
            .then( count => {
                if (count > 0) reject();
                else resolve();
            }).catch( err => reject(err) );
        });
    }

}

module.exports = Validate;
