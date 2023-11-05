export class RestList {
  constructor(
    private name: string,
    private totalCap: number,
    private customerCount: number
  ) {
    this.name = name;
    this.totalCap = totalCap;
    this.customerCount = customerCount;
  }

  getName(): string {
    return this.name;
  }
  getRate(): string {
    return this.customerCount + '/' + this.totalCap;
  }
}
