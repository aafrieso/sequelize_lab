const { Dog, Feeding } = require("../models")

const create = async (req, res) => {
  try {
    const dog = await Dog.create(req.body)
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const dogs = await Dog.findAll({
      include: [{ model: Feeding, as: "feedings" }],
    })
    res.status(200).json(dogs)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const dogs = await Dog.update(
      req.body,
      { where: { id: req.params.id }, returning: true }
    )
    res.status(200).json(dogs)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteDog = async (req, res) => {
  try {
    // Calling destroy on the model will not return the deleted record!
    const numberOfRowsRemoved = await Dog.destroy(
      { where: { id: req.params.id } }
    )
    res.status(200).json(numberOfRowsRemoved) // Expected: 1
  } catch (error) {
    res.status(500).json(error)
  }
}

const addFeeding = async (req, res) => {
  try {
    // Append a dogId to req.body:
    req.body.dogId = req.params.id
    const feeding = await Feeding.create(req.body)
    res.status(200).json(feeding)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  create,
  index,
  update,
  delete: deleteDog,
  addFeeding
}