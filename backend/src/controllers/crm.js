const db = require('../config/db');

// --- Contacts ---
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await db('crm_contacts').select('*');
    res.json(contacts);
  } catch (err) { next(err); }
};
exports.createContact = async (req, res, next) => {
  try {
    const [id] = await db('crm_contacts').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) { next(err); }
};

// --- Deals ---
exports.getDeals = async (req, res, next) => {
  try {
    const deals = await db('crm_deals').select('*');
    res.json(deals);
  } catch (err) { next(err); }
};
exports.createDeal = async (req, res, next) => {
  try {
    const [id] = await db('crm_deals').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) { next(err); }
};
exports.updateDeal = async (req, res, next) => {
  try {
    const updated = await db('crm_deals').where({ id: req.params.id }).update(req.body);
    res.json({ success: !!updated });
  } catch (err) { next(err); }
};

// --- Activities ---
exports.getActivities = async (req, res, next) => {
  try {
    const activities = await db('crm_activities').select('*');
    res.json(activities);
  } catch (err) { next(err); }
};
exports.createActivity = async (req, res, next) => {
  try {
    const [id] = await db('crm_activities').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) { next(err); }
};
