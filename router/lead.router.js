const express = require('express');
const { createLead, getAllLeads, updateLead, deleteLead } = require('../controller/lead.controller');

const router = express.Router();

router.route('/').post(createLead).get(getAllLeads)
router.route('/:leadId').patch(updateLead).delete(deleteLead)


module.exports = router