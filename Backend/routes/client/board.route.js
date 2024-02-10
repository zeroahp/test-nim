const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/board.controller");

router.get("/", controller.nimGet)
router.post("/", controller.nimPost)

module.exports = router;