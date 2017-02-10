"use strict";

import _knex from "knex";
import _bookshelf from "bookshelf";
import dotenv from "dotenv";

dotenv.config();

const knex = _knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        database: process.env.DB,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    debug: true
});

const Bookshelf = _bookshelf(knex);

// to resolve circular dependencies with relations
Bookshelf.plugin('registry');

export default Bookshelf;
