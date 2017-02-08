var userCreate =
"CREATE TABLE `Users` (" +
  "`ID` binary(16) NOT NULL," +
  "`Phone` bigint(10) NOT NULL," +
  "`Name` varchar(50) NOT NULL," +
  "`Email` varchar(50) NOT NULL," +
  "`Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
") ENGINE=InnoDB DEFAULT CHARSET=latin1;";

var userAddressCreate =
"CREATE TABLE `Users_Addresses` (" +
  "`ID` binary(16) NOT NULL," +
  "`User_ID` binary(16) NOT NULL," +
  "`Line_1` varchar(250) NOT NULL," +
  "`Line_2` varchar(250) DEFAULT NULL," +
  "`State` varchar(250) NOT NULL," +
  "`Pincode` int(6) NOT NULL," +
  "`Landmark` varchar(250) DEFAULT NULL," +
  "`Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
") ENGINE=InnoDB DEFAULT CHARSET=latin1;";


var userKey =
"ALTER TABLE `Users`" +
  "ADD PRIMARY KEY (`ID`)," +
  "ADD UNIQUE KEY `Phone` (`Phone`);";

var userAddressKey =
"ALTER TABLE `Users_Addresses`" +
  "ADD PRIMARY KEY (`ID`)," +
  "ADD KEY `User_ID` (`User_ID`);";


var userAddressFK =
"ALTER TABLE `Users_Addresses`" +
  "ADD CONSTRAINT `FK_Users-Addresses_Users` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;";


function handleError(err) {console.log(err) }

exports.up = function(knex, Promise) {
    return Promise.all([
        // tables
        knex.raw(userCreate).catch(handleError),
        knex.raw(userAddressCreate).catch(handleError),

        // indexes and keys
        knex.raw(userKey).catch(handleError),
        knex.raw(userAddressKey).catch(handleError),

        // relations | foreign keys
        knex.raw(userAddressFK).catch(handleError)
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        // dont disturb the order, if did then might get error because of fk constraints
        knex.schema.dropTable('Users_Addresses'),
        knex.schema.dropTable('Users')
    ]);
};
