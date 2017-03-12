"use strict";

import CheckIt from "checkit";

import HTTP from "./httpcodes";

export function ISE(error, res) {
    // console.log(error); // uncomment to see whole error
    return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Something is wrong.", data:error.message })
}

export function ModelError(error, res) {
    // console.log(error); // uncomment to see whole error
    if (error instanceof CheckIt.Error) {
        return res.status(HTTP.BAD_REQUEST)
        .json({
            message: "Not valid data, user couldn't be created",
            data:error.toJSON()
        });
    }
    else {
        return ISE(error, res);
    }
}
