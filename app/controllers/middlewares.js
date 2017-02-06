"use strict";

// all the middleware function to reuse everywhere
class Middleware {

    controllerBase (req, res, next) {
        // any business logic
        next();
    }

    authenticate (req, res, next) {
        // authenticating user with session/jwt
        next();
    }

}

export default Middleware;
