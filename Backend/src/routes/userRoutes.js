const express = require('express');
const router = express.Router();
const {
  getCollection,
  toggleCollection
} = require('../controllers/userController');

router.get('/collection', getCollection);

router.post('/collection', toggleCollection);

module.exports = router;
