const router = require("express").Router();
const usersController = require("../../controller/usersController");

// Matches with "/api/users"
router.route("/")
    .get(usersController.userFindByName)
    .post(usersController.userCreate);

router.route("/userid/:id")
    .get(usersController.userFindByUserId);

router.route("/:name")
.get(usersController.userFindByName);
// Matches with "/api/users/:id"
router.route("/:id")
    .get(usersController.userFindById)
    .put(usersController.userUpdate)
    .delete(usersController.userRemove);

// Matches with "/api/users/groups/:id"
router.route("/groups/:id")
    .get(usersController.userGetGroups);

module.exports = router;