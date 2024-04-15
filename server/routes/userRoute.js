const router = require("express").Router();
const { Login, SignUp, updatePassword } = require("../controllers/user.js");
router.post("/login", Login);
router.patch("/update/:id", updatePassword);
router.post("/signUp", SignUp);

module.exports = router;
