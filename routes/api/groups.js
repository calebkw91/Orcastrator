const router = require("express").Router();
const groupsController = require("../../controller/groupsController");

// Matches with "/api/groups"
router.route("/")
    .get(groupsController.groupFindAll)
    .post(groupsController.groupCreate);

// Matches with "/api/groups/:id"
router.route("/:id")
    .get(groupsController.groupFindById)
    .put(groupsController.groupUpdate)
    .delete(groupsController.groupRemove);

// Matches with "/api/groups/users/:id"
router.route("/users/:id")
    .get(groupsController.groupGetUsers);

// Matches with "/api/groups/users/"
router.route("/users")
    .post(groupsController.groupSaveUser);

module.exports = router;