exports.up = function(knex) {
  return knex.schema
    .createTable('crm_contacts', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email');
      table.string('phone');
      table.string('company');
      table.timestamps(true, true);
    })
    .createTable('crm_deals', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.decimal('value').defaultTo(0);
      table.string('stage').notNullable(); // New, Qualified, Negotiation, Won, Lost
      table.integer('contact_id').unsigned().references('id').inTable('crm_contacts').onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable('crm_activities', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('type'); // Call, Meeting, Email
      table.date('date').defaultTo(knex.fn.now());
      table.integer('deal_id').unsigned().references('id').inTable('crm_deals').onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('crm_activities')
    .dropTableIfExists('crm_deals')
    .dropTableIfExists('crm_contacts');
};
