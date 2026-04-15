const express = require('express');
const router = require('express').Router();
const leaveRequestsController = require('../controllers/leave_requests');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/leave-requests:
 *   get:
 *     summary: Get all leave requests
 *     tags: [LeaveRequests]
 *     responses:
 *       200:
 *         description: List of leave requests
 */
router.get('/', auth, leaveRequestsController.getLeaveRequests);

/**
 * @openapi
 * /api/leave-requests:
 *   post:
 *     summary: Create a new leave request
 *     tags: [LeaveRequests]
 *     responses:
 *       201:
 *         description: Leave request created
 */
router.post('/', auth, leaveRequestsController.createLeaveRequest);

/**
 * @openapi
 * /api/leave-requests/{id}:
 *   put:
 *     summary: Update a leave request
 *     tags: [LeaveRequests]
 *     responses:
 *       200:
 *         description: Leave request updated
 */
router.put('/:id', auth, leaveRequestsController.updateLeaveRequest);

/**
 * @openapi
 * /api/leave-requests/{id}:
 *   delete:
 *     summary: Delete a leave request
 *     tags: [LeaveRequests]
 *     responses:
 *       200:
 *         description: Leave request deleted
 */
router.delete('/:id', auth, leaveRequestsController.deleteLeaveRequest);

module.exports = router;
