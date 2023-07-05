import { connect } from "../config/db";
import { Todo } from "../model/todo.model"

export class TodoRepository {

  private db: any = {};
  private todoRepository: any;

  constructor() {
    this.db = connect();
    this.todoRepository = this.db.sequelize.getRepository(Todo);
  }

  async getTodo(id: string): Promise<any> {
    try {
      return await this.todoRepository.find({
        where: {
          id: id
        }
      })
    } catch (error) {
      console.error(error);
      return []
    }
  }

  async getTodos(): Promise<any> {
    try {
      const todos = await this.todoRepository.findAll();
      console.log('todos:::', todos);
      return todos;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  }

  async createTodo(todo: Todo): Promise<any> {
    let data = {};
    try {
      data = await this.todoRepository.create(todo);
    } catch(error: any) {
      console.error('Error::' + error);
    }
    return data;
  }

  async updateTodo(todo: Todo): Promise<any> {
    let data = {};
    try {
      data = await this.todoRepository.update({...todo}, {
        where: {
          id: todo.id
        }
      });
    } catch(error: any) {
      console.error('Error::' + error);
    }
    return data;
  }

  async deleteTodo(id: number): Promise<any> {
    let data = {};
    try {
      data = await this.todoRepository.destroy({
        where: {
          id: id
        }
      });
    } catch(error: any) {
      console.error('Error::' + error);
    }
    return data;
  }
}