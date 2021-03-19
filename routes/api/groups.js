const router = require("express").Router();
const groupsController = require("../../controller/groupsController");

// Matches with "/api/groups"
router.route("/")
    .get(groupsController.groupFindAll);
    
// Matches with "/api/groups/users/"
router.route("/users")
    .post(groupsController.groupSaveUser);

// Matches with "/api/groups/:id"
router.route("/:id")
    .get(groupsController.groupFindById)
    .put(groupsController.groupUpdate)
    .delete(groupsController.groupRemove)
    .post(groupsController.groupCreate);

// Matches with "/api/groups/users/:id"
router.route("/users/:id")
    .get(groupsController.groupGetUsers);


module.exports = router;