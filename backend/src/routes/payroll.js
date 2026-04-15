const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payroll');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/payroll:
 *   get:
 *     summary: Get all payroll records
 *     tags: [Payroll]
 *     responses:
 *       200:
 *         description: List of payroll records
 */
router.get('/', auth, payrollController.getAll);

/**
 * @openapi
 * /api/payroll:
 *   post:
 *     summary: Create a new payroll record
 *     tags: [Payroll]
 *     responses:
 *       201:
 *         description: Payroll record created
 */
router.post('/', auth, payrollController.create);

/**
 * @openapi
 * /api/payroll/{id}:
 *   put:
 *     summary: Update a payroll record
 *     tags: [Payroll]
 *     responses:
 *       200:
 *         description: Payroll record updated
 */
router.put('/:id', auth, payrollController.update);

/**
 * @openapi
 * /api/payroll/{id}:
 *   delete:
 *     summary: Delete a payroll record
 *     tags: [Payroll]
 *     responses:
 *       200:
 *         description: Payroll record deleted
 */
router.delete('/:id', auth, payrollController.delete);

module.exports = router;
