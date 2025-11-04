const express = require('express');
const router = express.Router();
const explanationController = require('../controllers/explanationController');

router.get('/', explanationController.getExplanations);
router.post('/', explanationController.addExplanation);
router.delete('/:id', explanationController.deleteExplanation);
router.put('/:id', explanationController.updateExplanation);

module.exports = router;
