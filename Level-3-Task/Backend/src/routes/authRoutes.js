const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/register", auth.register);
router.get("/verify/:token", auth.verifyEmail);
router.post("/manual-verify", auth.manualVerify);
router.post("/create-admin", auth.createAdmin);
router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);
router.post("/reset-password/:token", auth.resetPassword);

module.exports = router;
