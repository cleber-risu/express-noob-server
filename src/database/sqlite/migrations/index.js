const sqliteConnection = require("../../sqlite");

const createUsers = require("./createUsers");

async function migragionRun() {
  const schemas = [createUsers].join(""); // join para juntar todas as migrations, e parametro para juntar '', nada!

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.log(error));
}

module.exports = migragionRun;
