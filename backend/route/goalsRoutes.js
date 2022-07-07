const express = require('express');
const router = express.Router();

const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controller/goalsController')

//shortcut Way
router.route('/').get(getGoals).post(createGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);

// router.get('/', getGoals)
// router.post('/', createGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router