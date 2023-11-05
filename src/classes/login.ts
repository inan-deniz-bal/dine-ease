export class Login {
  constructor(
    private mail:string,
    private password:string
  ){
    this.mail=mail;
    this.password=password;
  }
  getUserInfo(){
    return {
      mail:this.mail,
      password:this.password
    }
  }
}
