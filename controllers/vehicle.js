const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('vehicle').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const vName = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('vehicle').find({ name: vName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = {
      name: req.body.name,
      stages: req.body.stages,
      thrust: req.body.thrust
    };
    const result = await mongodb.getDb().db().collection('vehicle').insertOne(vehicle);
    if (result.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occured while creating the contact');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createVehicle
};
