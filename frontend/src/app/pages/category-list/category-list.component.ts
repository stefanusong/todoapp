import { Component, OnInit } from '@angular/core';
import Category from './models/category';
import { CategoryService } from './services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  newCategoryTitle: string = "";
  updatedCategoryId: string = "";
  deletedCategoryId: string = "";

  constructor(private categoryService: CategoryService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategory()
      .subscribe((categories: any) => this.categories = categories);
  }

  navigateToTodoPage(id: string) {
    this.router.navigate(['todo', id]);
  }

  //#region Modal Functions
  openCreateModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  
  openUpdateModal(content: any, id: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.updatedCategoryId = id;
  }

  openDeleteModal(content: any, id: string){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.deletedCategoryId = id;
  }
  //#endregion


  //#region CRUD Functions
  createCategory(){
    this.categoryService.createCategory(this.newCategoryTitle)
      .subscribe((categories: any) => this.categories.push(categories));
  }
  
  updateCategory(id: string, title: string){
    this.categoryService.updateCategory(id, title)
      .subscribe(() => this.categories.forEach(category => {
        if(category._id === id) {
          category.title = title;
        }
      }))
  }

  deleteCategory(id: string){
    this.categoryService.deleteCategory(id)
      .subscribe(() => this.categories = this.categories.filter(category => category._id != id));
  }
  //#endregion
}
