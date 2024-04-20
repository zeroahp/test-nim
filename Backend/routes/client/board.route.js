const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/board.controller");

router.get("/", controller.nimGet)
router.post("/", controller.nimPost)
router.put("/:id", controller.nimPut)
router.get("/:idBoard", controller.nimGetIdBoard)
router.get("/detail/:id", controller.nimGetId)

module.exports = router;
