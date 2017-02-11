"use strict";

import Jwt from "jsonwebtoken";

// all the middleware function to reuse everywhere
class Middleware {

    applicationBase (req, res, next) {
        // will run first for every route in the app
        next();
    }

    controllerBase (req, res, next) {
        // will run for every request on the mentioned route
        next();
    }

    authenticate (req, res, next) {
        // authenticating user with session/jwt

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {

            Jwt.verify(
                req.headers.authorization.split(' ')[1],
                new Buffer(process.env.JWT_SECRET, "base64"),
                { algorithm: 'HS512' },
                (error, decoded) => {
                    if (error) {
                        return res.json("Invalid Token");
                    }
                    else {
                        next();
                    }
                }
            );

        }
        else {
            return res.json("No token found");
        }

    }


}

export default Middleware;
