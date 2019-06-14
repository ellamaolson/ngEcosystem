export class Submission {
  constructor(
    private name: string,
    private type: string,
    private description: string,
    private link: string,
    private bundleSize: number,
    private personName: string,
    private email: string
  ) {}

  toString() {
    return `Name: ${this.name}
    Type: ${this.type}
    Link: ${this.link.toString()}
    Description: ${this.description}
    Bundle Size: ${this.bundleSize}
    Person: ${this.personName}
    Email:${this.email}`;
  }
}
