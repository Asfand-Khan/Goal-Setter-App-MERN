const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);

module.exports = router;
