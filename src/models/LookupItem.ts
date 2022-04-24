interface ILookupItem {
  id: number;
  val: string;
}

class LookupItem implements ILookupItem {
  id: number;
  val: string;

  constructor() {
    this.id = 0;
    this.val = '';
  }
}

export { LookupItem };
