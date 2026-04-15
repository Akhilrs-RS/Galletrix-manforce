const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('attendance').del();
  await knex('workers').del();
  await knex('clients').del();
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Inserts seed entries
  await knex('users').insert([
    { username: 'admin', password: hashedPassword, role: 'admin' },
    { username: 'hr_manager', password: hashedPassword, role: 'hr' },
    { username: 'supervisor1', password: hashedPassword, role: 'supervisor' },
    { username: 'accounts_user', password: hashedPassword, role: 'accounts' }
  ]);

  const [client1, client2] = await knex('clients').insert([
    { name: 'Al Futtaim Group', contact: 'Omar Al Futtaim', type: 'Construction', workers: 28, rate: 3200, till: '2025-12-31', status: 'Active', revenue: 89600 },
    { name: 'Emaar Properties', contact: 'Sarah Johnson', type: 'Real Estate', workers: 45, rate: 3500, till: '2026-06-30', status: 'Active', revenue: 157500 }
  ]).returning('id');

  await knex('workers').insert([
    { name: 'Mohammed Al Rashidi', worker_id: 'W001', category: 'Electrician', type: 'Own', nationality: 'Pakistani', salary: 2800, status: 'Deployed', expiry: '2025-08-14', emirates_id: '784-2020-1234567-1', client_id: client1.id, site: 'Downtown Dubai' },
    { name: 'Ramesh Kumar', worker_id: 'W002', category: 'Plumber', type: 'Own', nationality: 'Indian', salary: 2400, status: 'Available', expiry: '2025-11-30', emirates_id: '784-2020-5555666-2' }
  ]);
};
