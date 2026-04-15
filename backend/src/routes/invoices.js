const express = require('express');
const router = express.Router();
const invoicesController = require('../controllers/invoices');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get('/', auth, invoicesController.getInvoices);

/**
 * @openapi
 * /api/invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post('/', auth, invoicesController.createInvoice);

/**
 * @openapi
 * /api/invoices/{id}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Invoice updated
 */
router.put('/:id', auth, invoicesController.updateInvoice);

/**
 * @openapi
 * /api/invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Invoice deleted
 */
router.delete('/:id', auth, invoicesController.deleteInvoice);

module.exports = router;
