const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crm');
const auth = require('../middleware/auth');

router.get('/contacts', auth, crmController.getContacts);
router.post('/contacts', auth, crmController.createContact);

router.get('/deals', auth, crmController.getDeals);
router.post('/deals', auth, crmController.createDeal);
router.patch('/deals/:id', auth, crmController.updateDeal);

router.get('/activities', auth, crmController.getActivities);
router.post('/activities', auth, crmController.createActivity);

module.exports = router;
