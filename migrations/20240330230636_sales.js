/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
      .hasTable('sales') //Pregunta sí la tabla products existe
      .then((exists) => {
          //Valida sí la tabla NO existe, se crea la tabla
          if (!exists) {
              return knex.schema.createTable("sales", (table) => {
                  table.increments("sale_id").primary();
                  table.string("product_name").notNullable();
                  table.float("price").notNullable();
                  table.integer("quantity_sold").notNullable();
                  table.float("total_price").notNullable();
                  table.timestamp("created_at").defaultTo(knex.fn.now()); //Crea una columna para guardar la hora en que se realizó el registro

                  //FK products
                  table
                  .integer("product_id")
                  .unsigned()
                  .references("products.product_id")//Hace referencia a la columna id de la tabla products

                  //FK customers
                  table
                  .integer("customer_id")
                  .unsigned()
                  .references("customers.customer_id");
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
