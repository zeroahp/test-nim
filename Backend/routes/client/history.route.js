const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/player.controller");

router.get("/", controller.playerGet)
router.post("/", controller.PlayerPost)

module.exports = router;