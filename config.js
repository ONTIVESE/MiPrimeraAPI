//Este archivo de configuración normalmente es un SINGLETON.
//....SINGLETON (es un archivo que se ejecuta varias veces, pero al ejecutarse una soa vez, todos los demas ya van a poder hacer uso de ello)
//Tiene como resposabilidad conectarse a la base de datos cuando el servidor se levante
//Tambien tiene la responsabilidad de conectarse al entorno

const env = "development"; //Le dice a que entorno conectarse en la base de datos
const knexfile = require("./knexfile"); //Esta linea manda a llamar al archivo de configuración knexfile.js
const knex = require("knex"); //Esta linea manda a la biblioteca de knex

module.exports = knex(knexfile[env]); //Oye knex conectate  a la base de datos que tengo en mi configuracion solo a la del entorno dev=development
