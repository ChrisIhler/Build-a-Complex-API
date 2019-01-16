const costume = require('../db')
const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const contentsInJSON = fs.readFileSync('src/db.json', 'utf-8')
const data = JSON.parse(contentsInJSON)




function getAllCostumes (limit) {
  return data
}

function getCostume (id) {
  const result = data.find(costume => costume.id === id)
  return result
}

function deleteCostume (id) {
  
  const index = data.findIndex(costume => costume.id === id)
  if (index === -1 ) {
  return { status: 404, message: 'The costume was not found so it was not deleted'}
  }
  const deletedCostume = data.splice(index,1)

  const contentsAsJSON = JSON.stringify(data)
  fs.writeFileSync('src/db.json', contentsAsJSON)

  return deletedCostume
}

function newCostume (name, price, descriptions="", tags=[]) { 
  const newCostumeItem = {
    id: uuid(),
    name: name, 
    price: price, 
    descriptions: descriptions, 
    tags: tags
  }
  console.log(newCostumeItem)
  console.log(data)
  data.push(newCostumeItem)
  const contentsAsJSON = JSON.stringify(data)
  fs.writeFileSync('src/db.json', contentsAsJSON)
  return newCostumeItem
}

function updateCostume (id, name, price, descriptions, tags) {
  console.log(id)
  const index = data.findIndex(costume => costume.id === id)
  console.log(index)
  if (index === -1 ) {
    return { status: 404, message: 'The costume was not found so it was not updated'}
    }
  const updateCostumeItem = data[index]
  if (name){
    updateCostumeItem.name = name
  }
  if (price){
    updateCostumeItem.price = price
  }
  if (descriptions){
    updateCostumeItem.descriptions = descriptions
  }
  if (tags) {
    updateCostumeItem.tags = tags
  }
  console.log(updateCostumeItem)

  const contentsAsJSON = JSON.stringify(data)
  fs.writeFileSync('src/db.json', contentsAsJSON)
  return updateCostumeItem
}

function getTag (id) { 
  const result = data.find(costume => costume.id === id)
  return result.tags
}

function deleteTag (id, tagId) { 
  const result = data.find(costume => costume.id === id)
  const tagIndex = result.tags.findIndex(tag => tag.id === tagId)
  const deletedTag = result.tags.splice(tagIndex, 1)

  const contentsAsJSON = JSON.stringify(data)
  fs.writeFileSync('src/db.json', contentsAsJSON)

  return deletedTag

}


function newTag (id, name, color) { 
  const costumeItem = data.find(costume => costume.id === id)
  const newTagItem = {
    id: uuid(),
    name: name, 
    color: color
  }
  costumeItem.tags.push(newTagItem)

  const contentsAsJSON = JSON.stringify(data)
  fs.writeFileSync('src/db.json', contentsAsJSON)

  return newTagItem
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