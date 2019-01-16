const models = require('../models/costumes')
var isHexcolor = require('is-hexcolor')


function getAllCostumes (req, res, next) {
  const limit = req.query.limit
  const result = models.getAllCostumes(limit)
  if (!result) {
    return next({ status: 404, message: 'No costume found'})
  }
  res.status(200).send(result)
}

function getCostume (req, res, next) { 
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide an id to get a costume'})
  }
  const result = models.getCostume(id)
  if (!result){
    return next({ status: 400, message: 'Costume not found'})
  }
  res.status(200).send(result)
}

function deleteCostume (req, res, next) {
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide an id to delete a costume'})
  }
  const result = models.deleteCostume(id)
  if (!result) {
    return next({ status: 404, message: 'The car was not found so it was not deleted'})
  }
  res.status(200).send(result)
}

function newCostume (req, res, next) { 
  const { name, price, descriptions, tags } = req.body
  if(!name || !price ) {
    return next({ status: 400, message: 'Cannot create costume. Needs a name and price. '})
  }
  if (typeof price !== "number" ) {
    return next({ status: 400, messdage: 'Cannot create costume. Price needs a number'})
  }
  const result =  models.newCostume( name, price, descriptions, tags )
  if(!result) {
    return next({ status: 400, message: 'Failed to create new costume'})
  }
  res.status(201).send(result)
}

function updateCostume (req, res, next) {
  const id = req.params.id
  if (!id) {
    return next ({ status: 400, message: 'Costume cannot be updated without an id.'})
  }
  if (!req.body) {
    return next ({ status: 400, message: 'Must attach a body to update a car'})
  }
  const { name, price, descriptions, tags } = req.body
  if (!name && !price && !descriptions) {
    return next({ status: 400, message: 'Must include a name, price, or description to edit costume'})
  }
    const result = models.updateCostume( id, name, price, descriptions, tags )
  if(!result) {
    return next({ status: 400, message: 'Failed to update costume'})
  }
  res.status(201).send(result)
}

// tags CRUD Functions below. /////////


function getTag (req, res, next) { 
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide an id to get a costume tag'})
  }
  const result = models.getTag(id)
  if(!result) {
    return next({ status: 400, message: 'Failed to get costume tags'})
  }
  res.status(400).send(result)
}

function deleteTag (req, res, next) { 
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide a costume id to delete a costume tag'})
  }
  const tagId = req.params.tagId
  if (!tagId) {
    return next({ status: 400, message: 'You need to provide a costume tag id to delete a costume tag'})
  }
  const result = models.deleteTag(id, tagId)
  if(!result) {
    return next({ status: 400, message: 'Failed to get costume tags'})
  }
  res.status(400).send(result)
}

function newTag (req, res, next) { 
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide a costume id to create a costume tag'})
  }
  const { name, color } = req.body
  if (!name) {
    return next({ status: 400, message: 'You need to provide a tag name to create a tag'})
  }
  if (typeof name !== "string" ) {
    return next({ status: 400, message: 'A tag name must be a string data type to create a tag'})
  }
  if (color) {
    if (isHexcolor(color)) {
      return next({ status: 400, message: 'you need to provide a valid excolor color to create a tag'})
    }
  }
  result = models.newTag(id, name, color)
  if(!result) {
    return next({ status: 400, message: 'Failed to make costume tags'})
  }
  res.status(400).send(result)
}

module.exports = {
  getAllCostumes,
  getCostume,
  deleteCostume,
  newCostume, 
  updateCostume,
  getTag,
  deleteTag,  
  newTag
  }
