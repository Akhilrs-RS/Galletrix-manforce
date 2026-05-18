exports.up = function(knex) {
  return knex.schema.table('workers', (table) => {
    table.decimal('hr_allowance').defaultTo(0);
    table.decimal('da_allowance').defaultTo(0);
    table.decimal('daily_wage').defaultTo(0);
    table.decimal('monthly_wage').defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.table('workers', (table) => {
    table.dropColumn('hr_allowance');
    table.dropColumn('da_allowance');
    table.dropColumn('daily_wage');
    table.dropColumn('monthly_wage');
  });
};
