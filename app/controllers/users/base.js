"use strict";

import CheckIt from "checkit";

// models used
import Users from "./../../models/users";

class Base {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Users.fetchAll()
        .then( all_users => {
            res.json({
                status: 1,
                message: "Users found",
                data: all_users.toJSON()
            });
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            res.json({ status: 0, message: "User couldn't be found", data:error.message })
        });
    }

    // POST request
    post (req, res) {

        let user = new Users({
            Phone: req.body.phone,
            Name: req.body.name,
            Email: req.body.email
        });

        user.save()
        .then( model => {
            res.json({
                status: 1,
                message: "User successfully created",
                data: model.StringID
            });
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            if (error instanceof CheckIt.Error) {
                res.json({ status: 0, message: "User couldn't be created", data:error.toJSON() });
            }
            else {
                res.json({ status: 0, message: "User couldn't be created", data:error.message });
            }
        });

    }

}

export default Base;
