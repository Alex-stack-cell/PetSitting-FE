export class UserLogin {
  email: string;
  passwd: string;
  token?: string;
  firstName?: string;

  constructor(email: string, passwd: string) {
    this.email = email;
    this.passwd = passwd;
  }
}
