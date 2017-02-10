"use strict";

module.exports = (router, middlewares) => {

    router.route('/')
        // .all(middlewares.authenticate) // will be run for all type of request on '/'

        .get( (req, res, next) => {
            res.send("Welcome to my world!");
        } )

        .post( (req, res, next) => {
            res.send("So, you know there are more than one type of request");
        } );

};
