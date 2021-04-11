
export class Application {
  public id?:number;
  public  numberYearsExperience: number;
  public workingExperience: string;
  public education: string;
  public applicationDate:string;
  public applicantId:number;
  public postingId:number;

  constructor(numberYearsExperience: number,workingExperience: string, education: string,
    applicationDate:string, applicantId:number,postingId:number,id?:number) {
      this.id=id;
      this.numberYearsExperience = numberYearsExperience;
      this.workingExperience = workingExperience;
      this.education = education;
      this.applicationDate = applicationDate;
      this.applicantId = applicantId;
      this.postingId = postingId;
  }
}
