const db = require('../config/db');

exports.getLeaveRequests = async (req, res, next) => {
  try {
    const requests = await db('leave_requests')
      .join('workers', 'leave_requests.worker_id', 'workers.id')
      .select('leave_requests.*', 'workers.name as worker_name');
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

exports.createLeaveRequest = async (req, res, next) => {
  try {
    const [id] = await db('leave_requests').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

exports.updateLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('leave_requests').where({ id }).update(req.body);
    res.json({ message: 'Leave request updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('leave_requests').where({ id }).delete();
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    next(err);
  }
};
