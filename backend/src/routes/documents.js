const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const documentsController = require('../controllers/documents');
const auth = require('../middleware/auth');

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

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
 *     summary: Upload a new document
 *     tags: [Documents]
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 */
router.post('/', auth, upload.single('document'), (req, res, next) => {
  if (req.file) {
    req.body.file_url = `/uploads/${req.file.filename}`;
  }
  next();
}, documentsController.createDocument);

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
