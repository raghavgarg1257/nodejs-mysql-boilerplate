"use strict";

import Base from "./base";
import IdParameter from "./id-parameter";
import IdParameterAddress from "./id-parameter-address";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/users', (req, res, next) => next() );

    // all the routes related to '/users'

    let base = new Base();
    router.route('/users')
        .all(base.all)
        .get(base.get) // fetch all users
        .post(base.post); // create new user

    // always place route with parameter at the end so that above routes become valid
    let idParameter = new IdParameter();
    router.route('/users/:id')
        .all(idParameter.all)
        .get(idParameter.get) // fetch single user by id
        .put(idParameter.put) // update user
        .delete(idParameter.delete); // delete user

    let address = new IdParameterAddress();
    router.route('/users/:id/address')
        .all(address.all)
        .get(address.get) // fetch all user's address
        .post(address.post); // create new address for the use

};
