"use strict";

import CheckIt from "checkit";
import Jwt from "jsonwebtoken";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Users from "../../models/users";

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
        .catch((error) => { ISE(error, res) });
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
        .catch((error) => { ModelError(error, res) });

    }


}

export default Base;
