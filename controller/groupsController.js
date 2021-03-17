const db = require("../models");

// Defining methods for the booksController
module.exports = {
    groupFindAll: function (req, res) {
        db.Group
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    groupFindById: function (req, res) {
        db.Group
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    groupCreate: function (req, res) {
        let savedUser;

        db.User.findById(req.params.id, (err, user) => {
            savedUser = user;

            db.Group.create(req.body, (err, group) => {
                savedUser.groups.push(group._id);
                db.User.findOneAndUpdate({ _id: req.params.id }, savedUser)
                    .catch(err => res.status(422).json(err));
                if (err) console.log(err);
            });

            if (err) console.log(err);
        });
    },
    groupUpdate: function (req, res) {
        db.Group
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    groupRemove: function (req, res) {
        db.Group
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    groupGetUsers: function (req, res) {
        db.Group
            .findById(req.params.id)
            .populate('users')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    groupSaveUser: function (req, res) {
        let savedUser;
        let updatedGroup;

        db.User.findById(req.body.userID, (err, user) => {
            savedUser = user;
            if (err) console.log(err);

            db.Group.findById(req.body.groupID, (err, group) => {
                group.users.push(savedUser);
                savedUser.groups.push(group);
                updatedGroup = group;
                if (err) console.log(err);

                db.User.findOneAndUpdate({ _id: req.body.userID }, savedUser)
                    .catch(err => res.status(422).json(err));

                db.Group.findOneAndUpdate({ _id: req.body.groupID }, updatedGroup)
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
            });
        });
    }
};