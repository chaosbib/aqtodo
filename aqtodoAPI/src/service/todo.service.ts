import { TodoRepository } from '../repository/todo.repository';

export class TodoService {

  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async getTodos() {
    return await this.todoRepository.getTodos();
  }

  async createTodo(todo: any): Promise<any> {
    return await this.todoRepository.createTodo(todo);
  }

  async updateTodo(todo: any) {
    return await this.todoRepository.updateTodo(todo);
  }

  async deleteTodo(id: any) {
    return await this.todoRepository.deleteTodo(id);
  }
}