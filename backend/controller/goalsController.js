const asyncHandler = require("express-async-handler")

//Des-  Get Goals
//Route- GET/api/goals
//access- privet
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ massage: "Get Goals from api " });
})
//Des-  Create Goals
//Route- POST/api/goals/:id
//access- privet
const createGoal = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text field")
    }
    res.status(200).json({ massage: "Create Goals from api " });
})
//Des-  Update Goals
//Route- PUT/api/goals/:id
//access- privet
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ massage: `Update Goals ${req.params.id}` });
})
//Des-  Delete Goals
//Route- DELETE/api/goals/:id
//access- privet
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ massage: `Delete Goals ${req.params.id}` });
})


module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}