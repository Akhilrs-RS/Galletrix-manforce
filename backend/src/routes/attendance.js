const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/attendance:
 *   get:
 *     summary: Get attendance records
 *     tags: [Attendance]
 */
router.get('/', auth, attendanceController.getAll);
router.post('/', auth, attendanceController.markAttendance);
router.delete('/', auth, attendanceController.clearAttendance);
router.post('/bulk', auth, attendanceController.bulkMarkAttendance);

module.exports = router;
