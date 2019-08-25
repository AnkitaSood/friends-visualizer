export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  private _r?: number;


  id: number;
  linkCount = 0;

  constructor(id) {
    this.id = id;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / 100);
  }

  set r(radius: number) {
    this._r = radius;
  }

  get r() {
    if (this._r) {
      return this._r;
    }
    return 50 * this.normal() + 20;
  }

  get fontSize() {
    return (10 * this.normal() + 10) + 'px';
  }

  get color() {
    if (this._r) {
      return 'rgb(220,212,243)';
    }
    return 'rgb(176,212,243)';
  }
}
