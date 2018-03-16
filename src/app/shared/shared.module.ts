import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material.module';



@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  declarations: []
})
export class SharedModule {}
