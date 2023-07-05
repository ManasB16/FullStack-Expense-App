const express = require("express");

const userController = require("../controllers/expense");

const router = express.Router();

router.post("/add-expense", userController.addExp);

router.get("/get-expense", userController.getExp);

router.delete("/delete-expense/:expID", userController.deleteExp);

module.exports = router;
