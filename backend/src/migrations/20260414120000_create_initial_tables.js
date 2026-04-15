exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').notNullable(); // admin, hr, supervisor, worker, accounts
      table.timestamps(true, true);
    })
    .createTable('clients', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('contact');
      table.string('phone');
      table.string('type');
      table.integer('workers');
      table.decimal('rate');
      table.date('till');
      table.string('status'); // Active, Expired
      table.decimal('revenue').defaultTo(0);
      table.timestamps(true, true);
    })
    .createTable('workers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('worker_id').unique();
      table.string('category');
      table.string('type'); // Own, Outsourced
      table.string('nationality');
      table.decimal('salary');
      table.string('status'); // Deployed, Available, On Leave
      table.date('expiry');
      table.string('emirates_id');
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('SET NULL');
      table.string('site');
      table.timestamps(true, true);
    })
    .createTable('deployments', (table) => {
      table.increments('id').primary();
      table.string('deployment_id').unique();
      table.string('site').notNullable();
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE');
      table.integer('workers_count').defaultTo(0);
      table.string('supervisor');
      table.string('status'); // On-Site, In Transit, Completed
      table.time('check_in');
      table.date('date').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    })
    .createTable('attendance', (table) => {
      table.increments('id').primary();
      table.integer('worker_id').unsigned().references('id').inTable('workers').onDelete('CASCADE');
      table.time('check_in');
      table.time('check_out');
      table.decimal('ot_hours').defaultTo(0);
      table.string('status'); // Present, Absent, Leave
      table.date('date').notNullable();
      table.timestamps(true, true);
    })
    .createTable('payroll', (table) => {
      table.increments('id').primary();
      table.integer('worker_id').unsigned().references('id').inTable('workers').onDelete('CASCADE');
      table.string('month');
      table.integer('year');
      table.decimal('basic');
      table.decimal('ot');
      table.decimal('allowance');
      table.decimal('deduction');
      table.decimal('net_pay');
      table.string('status'); // Paid, Pending, Processing
      table.timestamps(true, true);
    })
    .createTable('invoices', (table) => {
      table.increments('id').primary();
      table.string('invoice_number').unique();
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE');
      table.decimal('amount');
      table.date('issued_date');
      table.date('due_date');
      table.string('status'); // Paid, Pending, Overdue
      table.timestamps(true, true);
    })
    .createTable('leave_requests', (table) => {
      table.increments('id').primary();
      table.integer('worker_id').unsigned().references('id').inTable('workers').onDelete('CASCADE');
      table.string('type'); // Annual, Sick, Emergency
      table.date('from_date');
      table.date('to_date');
      table.integer('days');
      table.text('reason');
      table.string('status'); // Pending, Approved, Rejected
      table.timestamps(true, true);
    })
    .createTable('documents', (table) => {
      table.increments('id').primary();
      table.integer('worker_id').unsigned().references('id').inTable('workers').onDelete('CASCADE');
      table.string('type'); // Visa Copy, Labor Card
      table.date('expiry');
      table.string('status'); // Valid, Expiring Soon
      table.string('file_url');
      table.timestamps(true, true);
    })
    .createTable('recruitment', (table) => {
      table.increments('id').primary();
      table.string('candidate_name').notNullable();
      table.string('role');
      table.string('nationality');
      table.string('experience');
      table.string('stage'); // Applied, Screening, Interview, Offer, Hired
      table.date('date').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recruitment')
    .dropTableIfExists('documents')
    .dropTableIfExists('leave_requests')
    .dropTableIfExists('invoices')
    .dropTableIfExists('payroll')
    .dropTableIfExists('attendance')
    .dropTableIfExists('deployments')
    .dropTableIfExists('workers')
    .dropTableIfExists('clients')
    .dropTableIfExists('users');
};
