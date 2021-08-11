import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private baseService: BaseService) { }

  getTodo(categoryId: string){
    return this.baseService.read(`todo/${categoryId}`);
  }

  createTodo(categoryId: string, title: string){
    return this.baseService.create(`todo/${categoryId}`, {'title' : title});
  }

  updateTodo(categoryId: string, todoId: string, title: string){
    return this.baseService.update(`todo/${categoryId}/${todoId}`, {'title' : title});
  }

  deleteTodo(categoryId: string, todoId: string){
    return this.baseService.delete(`todo/${categoryId}/${todoId}`);
  }
}
