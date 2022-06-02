const express = require('express')
const campaignCtrl = require('../controllers/campaign.controller')

const router = express.Router()

router.route('/api/campaigns/')
  .get(campaignCtrl.getCampaigns)
  .post(campaignCtrl.create)

module.exports = router