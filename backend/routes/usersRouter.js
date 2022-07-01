const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);

module.exports = router;
