/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    //Pregunta sí la tabla products existe
    return knex.schema.hasTable("products").then((exists) => {
        //Si la tabla existe entra a la siguiente condición
        if (exists) {
            //Pregunta sí la columna customer, dentro de la tabla products existe
            return knex.schema.hasColumn("customer").then((exists) => {
                //Si no existe la columna, la crea con la siguiente linea de codigo
                if (!exists) {
                    //Este codigo agrega la columna customer dentro de la tabla products
                    return knex.schema.table("products", (table) => {
                        table
                            .integer("customer")
                            .unsigned() //Este codigo ayuda a que no se ingrese un numero negativo en el id
                            .references("customers.customer_id"); //Este codigo crea la FK, hace referencia a la tabla users columna user_id
                    });
                }
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
