import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule} from './material/material.module';
import { AppComponent } from './app.component';
import { VisualComponent } from './visual/visual.component';
import { DataFormComponent } from './data-form/data-form.component';
import { HeaderComponent } from './header/header.component';
import { DummyComponent } from './dummy/dummy.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './data-form/profile.component';


const appRoutes: Routes = [
  { path: '', component: DataFormComponent },
  { path: 'users',      component: DataFormComponent },
  { path: 'users/:id',      component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    VisualComponent,
    DataFormComponent,
    HeaderComponent,
    DummyComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
