
export class PostingUpdate {
  public id:number;
  public deadline:string;
  public name:string;
  public description:string;
  public requirements: string;

  constructor(id: number,deadline:string,
   name:string,description:string,requirements:string) {
     this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.description=description;
    this.requirements=requirements;
  }
}
