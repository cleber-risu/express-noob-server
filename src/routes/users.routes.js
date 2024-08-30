const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRouter = Router();

function myMiddleware(request, response, next) {
  console.log("vou passou pelo middlware");
  if (!request.body.isAdmin) {
    return response.status(401).json({ message: "user unauthorized" });
  }
  next();
}

const usersController = new UsersController();

// usersRouter.use(myMiddleware);

usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);

module.exports = usersRouter;
