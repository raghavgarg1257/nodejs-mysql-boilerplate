"use strict";

import CheckIt from "checkit";

import HTTP from "../../helpers/httpcodes";
import { isID } from '../../helpers/validate';
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Users from "../../models/users";

class IdParameter {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (!isID(req.params.id)) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: user.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "user couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }

    // PUT request
    put (req, res) {

        if (!isID(req.params.id)) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Users.where({'ID': new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {

                let updateObj = {};
                if (req.body.name) updateObj.Name = req.body.name;
                if (req.body.phone) updateObj.Phone = req.body.phone;
                if (req.body.email) updateObj.Email = req.body.email;

                if (Object.keys(updateObj).length === 0) {
                    res.status(HTTP.BAD_REQUEST).json({ message: "No parameter given"});
                }
                else {
                    Users.where({'ID': new Buffer(req.params.id, "hex")})
                    .save(updateObj, { patch:true }) // why using patch: so to update selective fields
                    .then( model => {
                        res.status(HTTP.OK).json({
                            message: "User successfully updated",
                            data: req.params.id
                        });
                    })
                    .catch((error) => { ModelError(error, res) });
                }

            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "user couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }

    // DELETE request
    delete (req, res) {

        if (!isID(req.params.id)) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {

                Users.where({'ID': new Buffer(req.params.id, "hex")})
                .destroy()
                .then( model => {
                    res.status(HTTP.OK).json({
                        status: 1,
                        message: "User successfully removed",
                    });
                })
                .catch((error) => { ISE(error, res) });

            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "user couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });
    }


}

export default IdParameter;
