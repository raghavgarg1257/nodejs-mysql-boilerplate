"use strict";

import CheckIt from "checkit";

import HTTP from "./../httpcodes";
import { isID } from './../../models/validate';

// models used
import Users from "./../../models/users";
import Users_Addresses from "./../../models/users-addresses";

class IdParameterAddress {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (!isID(req.params.id)) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch({ withRelated: ['addresses'] })
        .then( user => {
            if (user) {
                res.status(HTTP.OK).json({
                    message: "User address found",
                    data: user.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "user couldn't be found" });
            }
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Something wrong.", data:error.message });
        });

    }

    // POST request
    post (req, res) {

        if (!isID(req.params.id)) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch()
        .then( user => {
            if (user) {

                const user_address = new Users_Addresses({
                    User_ID: new Buffer(req.params.id, 'hex'),
                    Line_1: req.body.line1,
                    Line_2: req.body.line2,
                    State: req.body.state,
                    Pincode: req.body.pincode,
                    Landmark: req.body.landmark
                });

                user_address.save()
                .then( model => {
                    res.status(HTTP.OK).json({
                        message: "User's Address successfully created",
                        data: model.StringID
                    });
                })
                .catch( error => {
                    // console.log(error); // uncomment to see whole error
                    if (error instanceof CheckIt.Error) {
                        res.status(HTTP.BAD_REQUEST).json({ message: "Not valid data, user couldn't be updated", data:error.toJSON() });
                    }
                    else {
                        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Something wrong.", data:error.message });
                    }
                });

            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "user couldn't be found" });
            }
        })
        .catch( error => {
            // console.log(error); // uncomment to see whole error
            res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Something wrong.", data:error.message });
        });

    }


}

export default IdParameterAddress;
