const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documents');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of documents
 */
router.get('/', auth, documentsController.getDocuments);

/**
 * @openapi
 * /api/documents:
 *   post:
 *     summary: Create a new document record
 *     tags: [Documents]
 *     responses:
 *       201:
 *         description: Document created
 */
router.post('/', auth, documentsController.createDocument);

/**
 * @openapi
 * /api/documents/{id}:
 *   put:
 *     summary: Update a document record
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Document updated
 */
router.put('/:id', auth, documentsController.updateDocument);

/**
 * @openapi
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete a document record
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Document deleted
 */
router.delete('/:id', auth, documentsController.deleteDocument);

module.exports = router;
