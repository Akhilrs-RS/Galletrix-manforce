const db = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const { date } = req.query;
    let query = db('attendance')
      .leftJoin('workers', 'attendance.worker_id', 'workers.id')
      .select('attendance.*', 'workers.name as worker_name', 'workers.worker_id as display_id');

    if (date) query = query.where('attendance.date', date);

    const records = await query;
    res.json(records);
  } catch (err) { next(err); }
};

exports.markAttendance = async (req, res, next) => {
  try {
    const { worker_id, status, check_in, check_out, ot_hours, date } = req.body;
    
    // Check if record exists
    const existing = await db('attendance').where({ worker_id, date }).first();
    
    if (existing) {
      await db('attendance').where({ id: existing.id }).update({ status, check_in, check_out, ot_hours });
      res.json({ message: 'Attendance updated' });
    } else {
      await db('attendance').insert({ worker_id, date, status, check_in, check_out, ot_hours });
      res.status(201).json({ message: 'Attendance marked' });
    }
  } catch (err) { next(err); }
};

exports.clearAttendance = async (req, res, next) => {
  try {
    const { date, worker_id, worker_ids } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }
    
    let query = db('attendance').where({ date });
    if (worker_id) {
      query = query.where({ worker_id });
    } else if (worker_ids) {
      const ids = worker_ids.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
      if (ids.length > 0) {
        query = query.whereIn('worker_id', ids);
      }
    }
    
    await query.delete();
    res.json({ message: 'Attendance cleared' });
  } catch (err) { next(err); }
};

exports.bulkMarkAttendance = async (req, res, next) => {
  try {
    const { date, records } = req.body;
    if (!date || !Array.isArray(records)) {
      return res.status(400).json({ error: 'Date and records array are required' });
    }

    await db.transaction(async (trx) => {
      for (const record of records) {
        const { worker_id, status, check_in, check_out, ot_hours } = record;
        
        // Find existing record
        const existing = await trx('attendance').where({ worker_id, date }).first();
        
        if (existing) {
          await trx('attendance').where({ id: existing.id }).update({
            status,
            check_in: check_in || null,
            check_out: check_out || null,
            ot_hours: ot_hours || 0
          });
        } else {
          await trx('attendance').insert({
            worker_id,
            date,
            status,
            check_in: check_in || null,
            check_out: check_out || null,
            ot_hours: ot_hours || 0
          });
        }
      }
    });

    res.json({ message: 'Bulk attendance marked' });
  } catch (err) { next(err); }
};
