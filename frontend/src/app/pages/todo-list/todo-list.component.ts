import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Todo from '../category-list/models/todo';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  newTodoTitle: string = "";
  updatedTodoId: string = "";
  deletedTodoId: string = "";
  categoryId: string = "";

  constructor(private todoService: TodoService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params.categoryId;
    });
  }

  ngOnInit(): void {
    this.todoService.getTodo(this.categoryId)
      .subscribe((todos: any) => this.todos = todos);
  }


  //#region Modal Functions
  openCreateModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  
  openUpdateModal(content: any, id: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.updatedTodoId = id;
  }

  openDeleteModal(content: any, id: string){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.deletedTodoId = id;
  }
  //#endregion


  //#region CRUD Functions
  createTodo(){
    this.todoService.createTodo(this.categoryId, this.newTodoTitle)
      .subscribe((todos: any) => this.todos.push(todos));
  }
  
  updateTodo(id: string, title: string){
    this.todoService.updateTodo(this.categoryId, id, title)
      .subscribe(() => this.todos.forEach(todo => {
        if(todo._id === id) {
          todo.title = title;
        }
      }))
  }

  deleteTodo(todoId: string){
    this.todoService.deleteTodo(this.categoryId, todoId)
      .subscribe(() => this.todos = this.todos.filter(todo => todo._id != todoId));
  }
  //#endregion

}
