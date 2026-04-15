const db = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const { date, worker_id } = req.query;
    let query = db('attendance')
      .leftJoin('workers', 'attendance.worker_id', 'workers.id')
      .select('attendance.*', 'workers.name as worker_name', 'workers.worker_id as display_id');

    if (date) query = query.where('attendance.date', date);
    if (worker_id) query = query.where('attendance.worker_id', worker_id);

    const records = await query;
    res.json(records);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const record = await db('attendance').where({ id: req.params.id }).first();
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const [id] = await db('attendance').insert(req.body).returning('id');
    const newRecord = await db('attendance').where({ id }).first();
    res.status(201).json(newRecord);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await db('attendance').where({ id: req.params.id }).update(req.body);
    if (!updated) return res.status(404).json({ message: 'Attendance record not found' });
    const record = await db('attendance').where({ id: req.params.id }).first();
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await db('attendance').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: 'Attendance record not found' });
    res.json({ message: 'Attendance record deleted' });
  } catch (err) {
    next(err);
  }
};
