"use strict";

import CheckIt from "checkit";
import Jwt from "jsonwebtoken";

import HTTP from "./../../helpers/httpcodes";

// models used
import Users from "./../../models/users";

class Base {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Users.fetchAll()
        .then( all_users => {
            if (all_users.length) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: all_users.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No User found", data:error.message })
            }
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Something wrong.", data:error.message })
        });
    }

    // POST request
    post (req, res) {

        const user = new Users({
            Phone: req.body.phone,
            Name: req.body.name,
            Email: req.body.email
        });

        user.save()
        .then( model => {

            const token = Jwt.sign(
                { id: model.StringID },
                new Buffer(process.env.JWT_SECRET, "base64"),
                { algorithm: 'HS512', expiresIn: '1d' }
            );
            res.status(HTTP.OK).json({
                message: "User successfully created",
                data: {
                    id: model.StringID,
                    token: token
                }
            });

        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            if (error instanceof CheckIt.Error) {
                res.status(HTTP.BAD_REQUEST).json({ message: "Not valid data, user couldn't be created", data:error.toJSON() });
            }
            else {
                res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Something wrong", data:error.message });
            }
        });

    }


}

export default Base;
