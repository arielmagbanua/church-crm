import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
