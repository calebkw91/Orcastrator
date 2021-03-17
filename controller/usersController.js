const db = require("../models");

// Defining methods for the booksController
module.exports = {
    userFindAll: function (req, res) {
        db.User
            .find(req.body)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    userFindByUserId: function (req, res) {
        db.User
            .findOne({ userId: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    userFindById: function (req, res) {
        db.User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    userCreate: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    userUpdate: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    userRemove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    userGetGroups: function (req, res) {
        db.User
            .findById(req.params.id)
            .populate('groups')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};