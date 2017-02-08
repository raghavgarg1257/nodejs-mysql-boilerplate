require('dotenv').config();

module.exports = {
    client: 'mysql',
    connection: {
        database: process.env.DB,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
