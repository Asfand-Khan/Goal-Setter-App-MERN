const Goals = require("../models/goalsModel.js");
const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find({ user: req.user.id });
  res.status(200).json(goals);
});
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const goal = await Goals.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);

  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorised");
  }

  if (!goal.user.toString === req.user.id) {
    res.status(401);
    throw new Error("Unauthorised");
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorised");
  }

  if (!goal.user.toString === req.user.id) {
    res.status(401);
    throw new Error("Unauthorised");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
