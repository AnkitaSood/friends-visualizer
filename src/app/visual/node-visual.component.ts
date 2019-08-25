import {Component, Input, OnInit} from '@angular/core';
import { Node } from './node';
import {Router} from '@angular/router';
import {DataStoreService, Person} from '../data-store.service';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'" (click)="navigate(node.id)" >
      <svg:circle
          class="node"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="node.fontSize">
        {{ identifier }}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit {
  @Input('nodeVisual') node: Node;
  user: Person;

  constructor(private router: Router, private store: DataStoreService) { }

  ngOnInit(): void {
    this.user = this.store.getPerson(this.node.id);
  }
  get identifier(): string {
    return this.user ? this.user.lastName + ', ' + this.user.firstName : this.node.id.toString();
  }
  navigate(id): void {
    this.router.navigate(['users', id]);
  }
}
