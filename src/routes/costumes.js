const express = require('express');
const router = express.Router();
const controller = require('../controllers/costumes');

// Create, Read, Update, and Delete costumes
router.get('/', controller.getAllCostumes)
router.get('/:id', controller.getCostume)
router.delete('/:id', controller.deleteCostume)
router.post('/', controller.newCostume)
router.put('/:id', controller.updateCostume)

// Create, Read, and Delete tags through costumes
router.get('/:id/tags', controller.getTag)
router.delete('/:id/tags/:tagId', controller.deleteTag)
router.post('/:id/tags', controller.newTag)

module.exports = router




