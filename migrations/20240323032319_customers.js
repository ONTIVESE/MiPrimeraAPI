/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .hasTable("customers") //Pregunta sí la tabla products existe
        .then((exists) => {
            //Valida sí la tabla NO existe, se crea la tabla
            if (!exists) {
                return knex.schema.createTable("customers", (table) => {
                    table.increments("customer_id").primary();
                    table.string("name").notNullable();
                    table.string("last_name").notNullable();
                    table.string("mother_last_name").notNullable();
                    table.string("email").notNullable();
                    table.string("phone").notNullable();
                    table.string("address").notNullable();
                    table.integer("postal_code").notNullable();
                    table.string("city").notNullable();
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
