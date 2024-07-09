import { ApiExpress } from "./api/express/api.express";
import { TaskController } from "./api/express/controllers/task.controller";


function main() {
    const api = ApiExpress.build();

    const controller = TaskController.build();

    api.addGetRoute("/tasks", controller.list);
    api.addPostRoute("/tasks", controller.create);
    api.addUpdateRoute("/tasks/:id", controller.update);
    api.addDeleteRoute("/tasks/:id", controller.delete);


    api.start(3002);
}

main();