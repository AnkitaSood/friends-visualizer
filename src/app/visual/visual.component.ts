import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataStoreService} from '../data-store.service';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  constructor(private store: DataStoreService) { }

  ngOnInit() {
  }

}
