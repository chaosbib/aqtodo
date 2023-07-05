import { TodoService } from '../service/todo.service';

export class TodoController {

	private todoService: TodoService;

	constructor() {
		this.todoService = new TodoService();
	}

	async getTodos() {
		return await this.todoService.getTodos();
	}

	async createTodo(todo: any): Promise<any> {
		return await this.todoService.createTodo(todo);
	}

	async updateTodo(todo: any) {
		return await this.todoService.updateTodo(todo);
	}

	async deleteTodo(id: any) {
		return await this.todoService.deleteTodo(id);
	}
}