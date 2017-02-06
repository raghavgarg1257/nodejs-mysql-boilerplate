"use strict";

import Middlewares from "./controllers/middlewares";
import _home from "./controllers/home";
import _users from "./controllers/users";

module.exports = express => {

    // initiaizing express router
    let router = express.Router();
    let middlewares = new Middlewares();

    // middleware
    router.use(middlewares.controllerBase);

    // actual routes
    // router is compusary as a first arg and then we can send anything
    // we are sending router because its an object and object are passed by refrence
    _home(router, middlewares);
    _users(router, middlewares);

    // at this point router will contain all the routes and now it can be added to the express instance

    // return instance of router so that it can be added to the express instance
    return router;

}
