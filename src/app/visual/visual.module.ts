import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NodeVisualComponent} from './node-visual.component';
import {VisualComponent} from './visual.component';
import {LinkVisualComponent} from './link-visual.component';


@NgModule({
  declarations: [
    NodeVisualComponent,
    LinkVisualComponent,
    VisualComponent
  ],
  exports: [
    VisualComponent
  ],
  imports: [
    CommonModule,
  ]
})

export class VisualModule {}
