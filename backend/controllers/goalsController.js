const Goals = require("../models/goalsModel.js");

const getGoals = async (req, res) => {
  const goals = await Goals.find();
  res.status(200).json(goals);
};
const setGoals = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const goal = await Goals.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
};
const updateGoal = async (req, res) => {
  const goal = await Goals.findById(req.params.id);

  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
};
const deleteGoal = async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
