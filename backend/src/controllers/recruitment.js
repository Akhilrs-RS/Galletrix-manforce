const db = require('../config/db');

exports.getRecruitment = async (req, res, next) => {
  try {
    const records = await db('recruitment').select('*');
    res.json(records);
  } catch (err) {
    next(err);
  }
};

exports.createRecruitment = async (req, res, next) => {
  try {
    const [id] = await db('recruitment').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

exports.updateRecruitment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('recruitment').where({ id }).update(req.body);
    res.json({ message: 'Recruitment record updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecruitment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('recruitment').where({ id }).delete();
    res.json({ message: 'Recruitment record deleted' });
  } catch (err) {
    next(err);
  }
};
