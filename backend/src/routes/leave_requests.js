const express = require('express');
const router = express.Router();
const leaveRequestsController = require('../controllers/leave_requests');
const auth = require('../middleware/auth');

router.get('/', auth, leaveRequestsController.getLeaveRequests);
router.post('/', auth, leaveRequestsController.createLeaveRequest);
router.put('/:id', auth, leaveRequestsController.updateLeaveRequest);

module.exports = router;
