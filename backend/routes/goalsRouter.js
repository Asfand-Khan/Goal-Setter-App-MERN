const router = require("express").Router();
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsController.js");

router.get("/", getGoals);
router.post("/", setGoals);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
