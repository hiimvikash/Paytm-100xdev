const express = require('express');
const router = express.Router();

const  { authMiddleware } = require("../middleware");

const {handleUserSignup, handleUserSignin, handleUserUpdate, filterUserQuery} = require('../controllers/userController')


router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);
router.put("/", authMiddleware, handleUserUpdate);
router.get("/bulk", filterUserQuery);



module.exports = router;