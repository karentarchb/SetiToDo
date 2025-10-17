import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodoListPageRoutingModule } from './todo-list-routing.module';
import { TodoListPage } from './todo-list.page';
import { SharedModule } from '../../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoListPageRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  declarations: [TodoListPage]
})
export class TodoListPageModule {}
