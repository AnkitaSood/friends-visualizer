import {Component, Input, OnInit} from '@angular/core';
import { Person} from '../data-store.service';
import {ForceDirectedGraph} from './force-directed-graph';
import { Node } from './node';
import {Link} from './link';
@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  @Input() currentUser: Person;
  graph: ForceDirectedGraph;
  nodes: Node[] = [];
  links: Link[] = [];
  constructor() { }

  ngOnInit() {

    const me = this;
    this.nodes.push(this.createNode(this.currentUser.id, this.currentUser));

    this.currentUser.friends.forEach(f => {
      const node = me.createNode(f.id, me.currentUser);
      node.linkCount = f.friends.length;
      this.nodes.push(node);

      me.links.push(me.createLink(me.currentUser.id, f.id));
    });

    this.graph = new ForceDirectedGraph(this.nodes, this.links, {width: 500, height: 500});
    this.graph.initSimulation({width: 500, height: 500});
  }

  private createLink(n1, n2): Link {
    return new Link(n1, n2);
  }

  private createNode(id, currentUser: Person): Node {
    const node = new Node(id);
    node.x = 0;
    node.y = 0;

    if (id === currentUser.id) {
      node.r = 50;
    }

    return node;
  }

}
