export class Requests {
  public  id: string;
  public requested_by: string;
  public company: string;
  public status:string;
  public created_at:string;

  constructor(id :string,requestedBy: string,company: string,
    createdAt:string,status:string) {
      this.id = id;
      this.requested_by=requestedBy;
      this.company=company;
      this.created_at=createdAt;
      this.status=status;
  }
}
