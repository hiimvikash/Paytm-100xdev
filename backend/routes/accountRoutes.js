const express = require('express');
const router = express.Router();


const  { authMiddleware } = require("../middleware");
const { getBalanceOfUser, transferAmtTo } = require('../controllers/accountController');


router.get("/balance", authMiddleware, getBalanceOfUser);
router.post("/transfer", authMiddleware, transferAmtTo);


module.exports = router;