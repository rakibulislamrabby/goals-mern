const express = require('express');
const router = express.Router();

const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controller/goalsController')
const { protect } = require("../middleware/authMiddleWare")
//shortcut Way
// router.route('/').get(getGoals).post(createGoal);
// router.route('/:id').delete(deleteGoal).put(updateGoal);

router.get('/', protect, getGoals)
router.post('/', protect, createGoal)
router.put('/:id', protect, updateGoal)
router.delete('/:id', protect, deleteGoal)

module.exports = router