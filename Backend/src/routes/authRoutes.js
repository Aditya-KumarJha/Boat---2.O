const express = require('express');
const router = express.Router();
const { syncClerkUser } = require('../controllers/authController');

router.post('/sync-user', syncClerkUser);

module.exports = router;
