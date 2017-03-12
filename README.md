# NodeJS MySQL Boilerplate

This app defines a very neat and modular structure to start you next nodejs project.

Using: MySQL, NodeJS, Express, Bookshelf, Knex, Json Web Token(JWT)

Using ES6, with Babel (http://babeljs.io/)


## Pre-requisites:
1. NodeJS (https://nodejs.org/en/)
2. Globally installed nodemon (https://nodemon.io/)


## Steps to run:
```
git clone git@gitlab.com:raghavgarg1257/nodejs-mysql-boilerplate.git
cd nodejs-mysql-boilerplate
cp env.example .env
nano .env #now edit credentials according to your machine (mandatory for db connection)
npm install
```
Now to migrate Database
```
npm install knex -g

# To create the tables
npm run migrate-up

# To drop the tables
npm run migrate-down
```
Now to start the server
```
npm start
```
The app will be started on the mentioned port which will be printed in the console upon starting the server like: `http://localhost:8080`.


## Available routes
```
-> GET / : (open*) Just show the message
-> POST / : (open*) Another message.

-> GET /users : (open*) Show all the users in the app
-> POST /users [name, phone, email] : (open*) Add new user (generate jwt token)

-> GET /users:id : (protected*) Get the user info by id
-> PUT /users:id [name, phone, email](optional) : (protected*) Update the user info by id
-> DELETE /users:id : (protected*) Delete the user by id

-> GET /users:id/address : (protected*) Show all the address got the user by id
-> POST /users:id/address [line1, line2, state, pincode, landmark] : (protected*) Add new address to the user by id

# guide
open* - means route is un-protected, anyone can access the route
protected* - means a valid jwt token has to be used to access the route in header "Authorization" with value "Bearer {token}"
```
