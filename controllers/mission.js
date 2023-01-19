const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('mission').find();
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
    const mName = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('mission').find({ _id: mName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMission = async (req, res) => {
  try {
    const mission = {
      name: req.body.name,
      launchSite: req.body.launchSite,
      vehicle: req.body.vehicle,
      duration: req.body.duration,
      crew: req.body.crew,
      apogee: req.body.apogee,
      destination: req.body.destination
    };
    const result = await mongodb.getDb().db().collection('mission').insertOne(mission);
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
  createMission
};
