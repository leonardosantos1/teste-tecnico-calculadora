import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable("maths", (table) => {
        table.uuid("id").primary();
        table.string("calculation").notNullable();
        table.string("result").notNullable();
        table.uuid('user_id').notNullable().references('id').inTable('users');

      });
}


export async function down(knex: Knex): Promise<void> {
    
    return knex.schema.dropTableIfExists("maths");
}

