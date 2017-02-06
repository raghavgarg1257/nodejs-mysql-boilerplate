"use strict";

import CheckIt from "checkit";

import { isID } from './../../models/validate';

// models used
import Users from "./../../models/users";

class IdParameter {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (!isID(req.params.id)) res.json({ status: 0, message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {
                res.json({
                    status: 1,
                    message: "Users found",
                    data: user.toJSON()
                });
            }
            else {
                res.json({ status: 0, message: "User couldn't be found" });
            }
        })
        .catch( error => {
            console.log(error); // uncomment to see whole error
            res.json({ status: 0, message: "User couldn't be found", data:error.message })
        });

    }

    // PUT request
    put (req, res) {

        if (!isID(req.params.id)) res.json({ status: 0, message: "Invalid ID" });

        Users.where({'ID': new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {

                let updateObj = {};
                if (req.body.name) updateObj.Name = req.body.name;
                if (req.body.phone) updateObj.Phone = req.body.phone;
                if (req.body.email) updateObj.Email = req.body.email;

                if (Object.keys(updateObj).length === 0) {
                    res.json({ status: 0, message: "No parameter given"});
                }
                else {
                    Users.where({'ID': new Buffer(req.params.id, "hex")})
                    .save(updateObj, { method:"update" })
                    .then( model => {
                        res.json({
                            status: 1,
                            message: "User successfully updated",
                            data: req.params.id
                        });
                    })
                    .catch( error => {
                        // console.log(error); // uncomment to see whole error
                        if (error instanceof CheckIt.Error) {
                            res.json({ status: 0, message: "User couldn't be updated", data:error.toJSON() });
                        }
                        else {
                            res.json({ status: 0, message: "User couldn't be updated", data:error.message });
                        }
                    });
                }

            }
            else {
                res.json({ status: 0, message: "User couldn't be found" });
            }
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            res.json({ status: 0, message: "User couldn't be found", data:error.message })
        });

    }

    // DELETE request
    delete (req, res) {

        if (!isID(req.params.id)) res.json({ status: 0, message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {

                Users.where({'ID': new Buffer(req.params.id, "hex")})
                .destroy()
                .then( model => {
                    res.json({
                        status: 1,
                        message: "User successfully removed",
                    });
                })
                .catch( error => {
                    // console.log(error); // uncomment to see whole error
                    if (error instanceof CheckIt.Error) {
                        res.json({ status: 0, message: "User couldn't be removed", data:error.toJSON() });
                    }
                    else {
                        res.json({ status: 0, message: "User couldn't be removed", data:error.message });
                    }
                });

            }
            else {
                res.json({ status: 0, message: "User couldn't be found" });
            }
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            res.json({ status: 0, message: "User couldn't be found", data:error.message })
        });

    }

}

export default IdParameter;
