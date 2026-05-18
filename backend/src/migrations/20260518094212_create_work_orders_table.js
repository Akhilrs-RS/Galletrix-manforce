/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('work_orders', (table) => {
    table.increments('id').primary();
    table.string('site_name').notNullable();
    table.string('client_name').notNullable();
    table.string('assigned_name').notNullable();
    table.string('site_address').notNullable();
    table.string('status').notNullable().defaultTo('Pending');
    table.date('start_date');
    table.decimal('est_budget', 15, 2).defaultTo(0);
    table.text('description');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('work_orders');
};
