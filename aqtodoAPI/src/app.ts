import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { TodoController } from "./controllers/todo.controller";

class App {

  public express: express.Application;
  public todoController: TodoController;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.todoController = new TodoController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private routes(): void {

    this.express.get('/api/todo', (req, res) => {
      this.todoController.getTodos().then(data => res.json(data));
    });
    
    this.express.post('/api/todo', (req, res) => {
      console.log(req.body);
      this.todoController.createTodo(req.body).then((data: any) => res.json(data));
    });

    this.express.patch('/api/todo', (req, res) => {
      console.log(req.body);
      this.todoController.updateTodo(req.body).then((data: any) => res.json(data));
    });

    this.express.delete('/api/todo/:id', (req, res) => {
      console.log(req.body);
      this.todoController.deleteTodo(req.params.id).then((data: any) => res.json(data));
    });

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;