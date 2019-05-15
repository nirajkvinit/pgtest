// export DB Connection
const pg = require("pg");
const tableName = "test";

//
const getDBClient = () => {
  let conString =
    "postgres://fgf:AZadsfgdGBKpYATRTadfsgTTfH@isifflo.db.elephantsql.com:5432/pedhdsdsgssjqp";

  let client = new pg.Client(conString);

  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject(null);
      } else {
        console.log("DB is connected");
        resolve(client);
      }
    });
  });
};

const createTableSQL = () => {
  return `
  CREATE TABLE IF NOT EXISTS ${tableName}(
    id              SERIAL        PRIMARY KEY,
    name            VARCHAR(255)  NOT NULL,
    contact_number  VARCHAR(50)   NULL,
    email           VARCHAR(255)  UNIQUE,
    address         TEXT
    
   );
  `;
};

const queryExecutor = (dbClient, strSQL) => {
  return new Promise((resolve, reject) => {
    dbClient.query(strSQL, (err, result) => {
      if (err) {
        console.log(`Error occured while executing the query, ${strSQL}`);
        console.error(`Error:  ${err}`);
        reject(`Error occured while executing query, ${err}`);
      } else {
        console.log("Query was executed successfully!");
        resolve(result);
      }
    });
  });
};
module.exports = {
  getDBClient,
  tableName,
  createTableSQL,
  queryExecutor
};
