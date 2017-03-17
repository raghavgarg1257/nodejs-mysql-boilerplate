"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';

// related models
// just importing to register it to the Bookshelf register
import "./users-addresses.js";

class Users extends Bookshelf.Model {

    // Initialization
    initialize () {

        // defining events for validation and other stuff
        this.on("creating", (model, attrs, options) => {
            this.attributes.ID = (this.attributes.ID) ? this.attributes.ID : crypto.randomBytes(16);
            this.id = this.attributes.ID; // because we are using custom id and to overwrite native properties
        }, this);

        this.on("saving", (model, attrs, options) => {

            // preparing the data
            let validateObj = {}, validateRule = {};

            Object.keys(this.attributes).map( key => {
                // sanitizing the input
                this.attributes[key] = (key.includes("ID")) ? this.attributes[key] : sanitize(this.attributes[key]);

                validateObj[key] = (!key.includes("ID")) ? this.attributes[key] : this.attributes[key].toString("hex");
                validateRule[key] = Users.validation_rules()[key];
            });

            if (Object.keys(validateObj).length !== 0) {
                return CheckIt(validateRule).validate(validateObj);
            }

        }, this);
    }

    constructor () {
        super();
        Bookshelf.Model.apply(this, arguments);
    }

    get tableName () { return "Users" } // table to map with the DB

    get idAttribute () { return "ID" }


    // Relations
    addresses () { return this.hasMany('Users_Addresses', 'User_ID') }


    // Validation Rules
    static validation_rules () { return {
        Email: ['required', 'email'],

        Name: ['required', val => {
            if (!isName(val)) throw new Error("The Name is not valid string");
        }],

        ID: ['required', val => {
            if (!isID(val)) throw new Error("The ID is not valid hexadecimal");
        }],

        Phone: ['required', 'numeric', 'exactLength:10', val => {
            // have to use promise to make it sync because of db query
            return isExist(Users, "Phone", val, "ID")
            .then( () => {/* let it pass, since we didn't found it in our database */})
            .catch( (err) => {
                // console.log(err); // uncomment it to see full error
                if (err) throw new Error(err);
                else throw new Error("The phone number is already in use")
            });
        }]
    }}


    // Helper Function
    get StringID () { return this.attributes.ID.toString("hex") }

    set StringID (string = null) {
        if (string === null) return false;
        return this.attributes.ID = new Buffer(string, "hex");
    }

}

export default Bookshelf.model("Users", Users);
