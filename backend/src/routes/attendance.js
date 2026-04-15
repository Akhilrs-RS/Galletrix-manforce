const express = require('express');
const router = express.Router();
const db = require('../config/db');

const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/attendance:
 *   get:
 *     summary: Get attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: List of attendance
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const { date } = req.query;
    let query = db('attendance');
    if (date) query = query.where({ date });
    const records = await query.select('*');
    res.json(records);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
