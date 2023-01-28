const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  // #swagger.tags = ['Vehicle']
  // #swagger.description = 'Get all vehicle objects'

  mongodb
    .getDb()
    .db()
    .collection('vehicle')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  // #swagger.tags = ['Vehicle']
  // #swagger.description = 'Get vehicle object by _id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('vehicle')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createVehicle = async (req, res) => {
  // #swagger.tags = ['Vehicle']
  // #swagger.description = 'Add Vehicle'
  const vehicle = {
    name: req.body.name,
    stages: req.body.stages,
    thrust: req.body.thrust
  };
  const response = await mongodb.getDb().db().collection('vehicle').insertOne(vehicle);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateVehicle = async (req, res) => {
  // #swagger.tags = ['Vehicle']
  // #swagger.description = 'Update Vehicle'
  // #swagger.security = [{ "oauth": ["write:vehicle", "read:vehicle"] }]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const mId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const vehicle = {
    name: req.body.name,
    stages: req.body.stages,
    thrust: req.body.thrust
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('vehicle')
    .replaceOne({ _id: mId }, vehicle);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteVehicle = async (req, res) => {
  // #swagger.tags = ['Vehicle']
  // #swagger.description = 'Delete Vehicle'
  // #swagger.security = [{ "oauth": ["write:vehicle", "read:vehicle"] }]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const mId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('vehicle').remove({ _id: mId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle
};
