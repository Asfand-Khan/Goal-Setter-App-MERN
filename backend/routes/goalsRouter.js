const router = require("express").Router();
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsController.js");

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").delete(deleteGoal).put(updateGoal);

module.exports = router;
