import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private baseService: BaseService) { }

  getCategory() {
    return this.baseService.read('category');
  }

  createCategory(title: string) {
    return this.baseService.create('category', {'title' : title} );
  }

  updateCategory(id: string, title: string){
    return this.baseService.update(`category/${id}`, {'title' : title} );
  }

  deleteCategory(id: string){
    return this.baseService.delete(`category/${id}`);
  }
}
