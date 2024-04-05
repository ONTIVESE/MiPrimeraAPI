/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*Es lo que la migración creará según lo que configuremos (tablas, campos, cambiar tipos de campos, etc.)*/
exports.up = function (knex) {
    return knex.schema
        .hasTable("products") //Pregunta sí la tabla products existe
        .then((exists) => {
            //Valida sí la tabla NO existe, se crea la tabla
            if (!exists) {
                return knex.schema.createTable("products", (table) => {
                    table.increments("product_id").primary();
                    table.string("name").notNullable();
                    table.string("description").notNullable();
                    table.float("price").notNullable();
                    table.integer("sku").notNullable();
                    table.boolean("active").notNullable().defaultTo(true);
                    table.timestamp("created_at").defaultTo(knex.fn.now());
                });
            }
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
