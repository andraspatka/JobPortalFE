export class Requests {
  public  id: number;
  public requestedByFirstName: string;
  public requestedByLastName: string;
  public requestedByEmail:string;
  public status:string;

  constructor(id :number,requestedByFirstName: string,requestedByLastName: string,
    requestedByEmail:string,status:string) {
      this.id = id;
      this.requestedByEmail=requestedByEmail;
      this.requestedByFirstName=requestedByFirstName;
      this.requestedByLastName=requestedByLastName;
  }
}
