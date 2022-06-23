export class Owner {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  birthDate?: Date;
  passwd: string;
  // score?: number | null;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    birthdate: Date,
    passwd: string
    // score: number | null
  ) {
    this.id = id;
    this.lastName = lastname;
    this.firstName = firstname;
    this.email = email;
    this.birthDate = birthdate;
    this.passwd = passwd;
    // this.score = score;
  }
}
