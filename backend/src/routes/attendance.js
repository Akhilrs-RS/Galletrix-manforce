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

/**
 * @openapi
 * /api/attendance:
 *   post:
 *     summary: Mark or update attendance
 *     tags: [Attendance]
 */
router.post('/', auth, attendanceController.markAttendance);

module.exports = router;
