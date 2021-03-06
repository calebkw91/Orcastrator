const router = require("express").Router();
const groupsController = require("../../controllers/groupsController");

// Matches with "/api/books"
router.route("/")
  .get(groupsController.groupFindAll)
  .post(groupsController.groupCreate);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(groupsController.groupFindById)
  .put(groupsController.groupUpdate)
  .delete(groupsController.groupRemove);

module.exports = router;