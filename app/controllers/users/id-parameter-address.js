"use strict";

import CheckIt from "checkit";

import { isID } from './../../models/validate';

// models used
import Users from "./../../models/users";
import Users_Addresses from "./../../models/users-addresses";

class IdParameterAddress {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (!isID(req.params.id)) res.json({ status: 0, message: "Invalid ID" });

        Users.where({"ID": new Buffer(req.params.id, "hex")}).fetch({ withRelated: ['addresses'] })
        .then( user => {
            if (user) {
                res.json({
                    status: 1,
                    message: "User address found",
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

    // POST request
    post (req, res) {

        if (!isID(req.params.id)) res.json({ status: 0, message: "Invalid ID" });

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
                    console.log("model after save:", model.attributes);
                    res.json({
                        status: 1,
                        message: "User's Address successfully created",
                        data: model.StringID
                    });
                })
                .catch( error => {
                    console.log(error); // uncomment to see whole error
                    if (error instanceof CheckIt.Error) {
                        res.json({ status: 0, message: "User's Address couldn't be created", data:error.toJSON() });
                    }
                    else {
                        res.json({ status: 0, message: "User's Address couldn't be created", data:error.message });
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

export default IdParameterAddress;
