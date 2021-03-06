const router = require("express").Router();
const usersController = require("../../controller/usersController");

// Matches with "/api/books"
router.route("/")
  .get(usersController.userFindAll)
  .post(usersController.userCreate);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(usersController.userFindById)
  .put(usersController.userUpdate)
  .delete(usersController.userRemove);

module.exports = router;