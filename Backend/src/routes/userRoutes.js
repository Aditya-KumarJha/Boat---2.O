const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getCollection,
  addToCollection
} = require('../controllers/userController');

router.get('/collection', requireAuth, getCollection);

router.post('/collection', requireAuth, addToCollection);

module.exports = router;
