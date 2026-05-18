const db = require('../config/db');

exports.getDeployments = async (req, res, next) => {
  try {
    const deployments = await db('deployments')
      .leftJoin('clients', 'deployments.client_id', 'clients.id')
      .select('deployments.*', 'clients.name as client_name');
    res.json(deployments);
  } catch (err) { next(err); }
};

exports.assignWorker = async (req, res, next) => {
  try {
    const { worker_id, deployment_id } = req.body;
    const deployment = await db('deployments').where({ id: deployment_id }).first();
    if (!deployment) return res.status(404).json({ message: 'Deployment not found' });

    await db('workers').where({ id: worker_id }).update({
      client_id: deployment.client_id,
      site: deployment.site,
      status: 'Deployed'
    });

    res.json({ message: 'Worker assigned' });
  } catch (err) { next(err); }
};

exports.assignMultipleWorkers = async (req, res, next) => {
  try {
    const { worker_ids, site_name, client_name, duration } = req.body;
    if (!worker_ids || !Array.isArray(worker_ids) || worker_ids.length === 0) {
      return res.status(400).json({ message: 'No worker IDs provided' });
    }
    if (worker_ids.length > 10) {
      return res.status(400).json({ message: 'Cannot assign more than 10 workers at a time' });
    }

    let client = null;
    if (client_name) {
      client = await db('clients').whereRaw('LOWER(name) = ?', [client_name.toLowerCase()]).first();
    }

    const clientId = client ? client.id : null;

    await db('workers')
      .whereIn('id', worker_ids)
      .update({
        client_id: clientId,
        site: site_name,
        status: 'Deployed'
      });

    const deploymentId = 'DEP-' + Date.now();
    await db('deployments').insert({
      deployment_id: deploymentId,
      site: site_name,
      client_id: clientId,
      workers_count: worker_ids.length,
      status: 'On-Site',
      date: new Date()
    });

    res.status(201).json({ message: 'Workers deployed successfully' });
  } catch (err) {
    next(err);
  }
};

exports.completeWorkerDeployment = async (req, res, next) => {
  try {
    const { worker_id } = req.body;
    const worker = await db('workers').where({ id: worker_id }).first();
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    await db('workers').where({ id: worker_id }).update({
      client_id: null,
      site: null,
      status: 'Available'
    });

    if (worker.site) {
      await db('deployments')
        .where({ site: worker.site, client_id: worker.client_id, status: 'On-Site' })
        .update({ status: 'Completed' });
    }

    res.json({ message: 'Deployment marked as completed' });
  } catch (err) {
    next(err);
  }
};
