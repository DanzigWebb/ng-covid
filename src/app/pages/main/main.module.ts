import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MatTableModule } from '@angular/material/table';

import { MainComponent } from './main.component';
import { StoreModule } from '@ngrx/store';
import { casesReducer } from '@app/store/cases/cases.reducer';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatTableModule,

    StoreModule.forRoot({
      casesList: casesReducer
    }),
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MainModule {
}
