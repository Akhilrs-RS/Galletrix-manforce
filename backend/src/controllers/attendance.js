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
