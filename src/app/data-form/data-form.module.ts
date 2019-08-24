import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {StoreModule} from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('data-form', {})

  ]
})
export class DataFormModule { }
