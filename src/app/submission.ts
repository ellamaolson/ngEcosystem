export class Submission {
  name: string;
  type: string;
  description: string;
  link: string;
  personName: string;
  email: string;

  constructor(name, type, description, link, personName, email) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.link = link;
    this.personName = personName;
    this.email = email;
  }

  toString() {
    return '\nName: ' + this.name
    + '\nType: ' + this.type
    + '\nDescription: ' + this.description
    + '\nLink: ' + this.link.toString()
    + '\nPerson: ' + this.personName
    + '\nEmail: ' + this.email;
  }
}
