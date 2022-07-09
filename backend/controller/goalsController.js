const asyncHandler = require("express-async-handler")

const Goal = require('../models/goalModel');
const User = require("../models/userModel")
//Des-  Get Goals
//Route- GET/api/goals
//access- privet
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
})
//Des-  Create Goals
//Route- POST/api/goals/:id
//access- privet
const createGoal = asyncHandler(async (req, res) => {
    // console.log(req.body);
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal);
})
//Des-  Update Goals
//Route- PUT/api/goals/:id
//access- privet
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id);
    //check for user. 
    if (!user) {
        res.status(401)
        throw new Error("User Not Found")
    }
    //make sure the logged in user mathes the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User Not Authorized")
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updateGoal);
})
//Des-  Delete Goals
//Route- DELETE/api/goals/:id
//access- privet
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id);
    //check for user. 
    if (!user) {
        res.status(401)
        throw new Error("User Not Found")
    }
    //make sure the logged in user mathes the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User Not Authorized")
    }
    res.status(200).json(goal);
})


module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}