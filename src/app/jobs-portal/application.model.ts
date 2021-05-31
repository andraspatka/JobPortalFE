
export class Application {
  public id?:string;
  public  experience: number;
  public work_experience: string;
  public education: string;
  public date_applied:string;
  public user_id:string;
  public posting_id:string;

  constructor(numberYearsExperience: number,workingExperience: string, education: string,
    applicationDate:string, applicantId:string,postingId:string,id?:string) {
      this.id=id;
      this.experience = numberYearsExperience;
      this.work_experience = workingExperience;
      this.education = education;
      this.date_applied = applicationDate;
      this.user_id= applicantId;
      this.posting_id = postingId;
  }
}
