const express = require("express");
const router = express.Router();
const { syncUser } = require("../controllers/syncController");

router.post("/sync", syncUser);

module.exports = router;
