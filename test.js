const helpers = require("./helpers");

// test whether the connection is working or not

(async () => {
  let client = null;
  let { tableName, getDBClient, queryExecutor, createTableSQL } = helpers;

  try {
    // get DB Client
    client = await getDBClient();
    // console.log(client);

    // create a table
    // let createTableSQL = createTableSQL();
    let result = await queryExecutor(client, createTableSQL());
    console.log(result);

    console.log(tableName);

    // Insert a row
    let createSQL = `INSERT INTO ${tableName} 
        (name, contact_number, email, address) VALUES
        ('Niraj Kumar', 'gdghfhjgjh', 'sffdghf@gmail.com', 'sdfg')
    `;

    let insertResult = await queryExecutor(client, createSQL);
    console.log(insertResult);
    await SelectTable(client);
  } catch (error) {
    console.log("Error occured", error);
  } finally {
    // close DB Connection
    if (client) {
      client.end();
    }
  }
})();

const SelectTable = async client => {
  // select * from table
  let selectTableSQL = `SELECT * FROM ${helpers.tableName}`;
  console.log(selectTableSQL);
  let selectedRows = await helpers.queryExecutor(client, selectTableSQL);
  console.log(selectedRows);
};
