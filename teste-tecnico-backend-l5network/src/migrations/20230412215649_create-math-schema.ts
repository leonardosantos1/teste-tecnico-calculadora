import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable("maths", (table) => {
        table.uuid("id").primary();
        table.string("calculation").notNullable();
        table.string("result").notNullable();
        table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');;
        table.timestamp('date').defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    
    return knex.schema.dropTableIfExists("maths");
}

