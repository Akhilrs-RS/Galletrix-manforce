const db = require('../config/db');

exports.getLeaveRequests = async (req, res, next) => {
  try {
    const requests = await db('leave_requests')
      .join('workers', 'leave_requests.worker_id', 'workers.id')
      .select(
        'leave_requests.*',
        'workers.name as worker_name',
        'workers.worker_id as display_id'
      );
    res.json(requests);
  } catch (err) { next(err); }
};

exports.createLeaveRequest = async (req, res, next) => {
  try {
    const [id] = await db('leave_requests').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) { next(err); }
};

exports.updateLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('leave_requests').where({ id }).update(req.body);
    res.json({ message: 'Request updated' });
  } catch (err) { next(err); }
};
