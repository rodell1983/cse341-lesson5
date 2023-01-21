const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('mission')
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('mission')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createMission = async (req, res) => {
  const mission = {
    name: req.body.name,
    launchSite: req.body.launchSite,
    vehicle: req.body.vehicle,
    duration: req.body.duration,
    crew: req.body.crew,
    apogee: req.body.apogee,
    destination: req.body.destination
  };
  const response = await mongodb.getDb().db().collection('mission').insertOne(mission);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateMission = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const mId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const mission = {
    name: req.body.name,
    launchSite: req.body.launchSite,
    vehicle: req.body.vehicle,
    duration: req.body.duration,
    crew: req.body.crew,
    apogee: req.body.apogee,
    destination: req.body.destination
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('mission')
    .replaceOne({ _id: mId }, mission);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteMission = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const mId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('mission').remove({ _id: mId }, true);
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
  createMission,
  updateMission,
  deleteMission
};
