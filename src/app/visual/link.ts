import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: any;
  target: any;

  constructor(source, target) {
    this.source = source;
    this.target = target;
  }
}
