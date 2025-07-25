const express = require("express");
const router = express.Router();
const { syncUser } = require("../controllers/syncController");

router.post("/sync-user", syncUser);

module.exports = router;
