
export class PostingWithoutId {
  public postedById: number;
  public postedAt: string;
  public deadline:string;
  public numberOfViews:number;
  public name:string;
  public description:string;
  public categoryId:number;
  public requirements: string;

  constructor(postedById: number, postedAt:string,deadline:string,
    nrOfView:number,name:string,description:string,categoryId:number,requirements:string) {
    this.name = name;
    this.postedById=postedById;
    this.postedAt=postedAt;
    this.deadline = deadline;
    this.categoryId = categoryId;
    this.numberOfViews = nrOfView;
    this.description=description;
    this.requirements=requirements;
  }
}
