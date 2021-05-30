export class TypesEvents
{
  //-----USERS---------
  user_find_all:string;
  user_find_id:string;
  user_logged_in:string;
  user_logout:string;
  user_register:string;

  //-----COMPANIES------
  company_get_all:string;
  company_added:string;

  //-----APPLICATIONS----
  application_deleted:string;
  application_added:string;
  applications_of_posting:string;
  applications_of_user:string;
  applications_of_find_all:string;

  //-------CATEGORIES------
  category_find_all:string;
  category_addded:string;

  //------POSTINGS--------
  posting_find_all:string;
  posting_delete:string;
  posting_get_id:string;
  posting_update:string;
  posting_add:string;

  constructor(){

    this.user_find_all = "USER_FIND_ALL";
    this.user_find_id = "USER_FIND_ID";
    this.user_logged_in = "USER_LOGGED_IN";
    this.user_logout = "USER_LOGGED_OUT";
    this.user_register = "USER_REGISTERED";
    this.company_get_all = "COMPANIES_GET";
    this.company_added = "COMPANY_ADDED";
    this.application_deleted = "APPLICATION_DELETED";
    this.application_added = "APPLICATION_ADDED";
    this.applications_of_posting = "APPLICATIONS_OF_POSTING";
    this.applications_of_user = "APPLICATIONS_OF_USER";
    this.applications_of_find_all = "APPLICATIONS_FIND_ALL";
    this.category_find_all = "CATEGORIES_FIND_ALL";
    this.category_addded = "CATEGORY_ADDED";
    this.posting_find_all = "POSTINGS_FIND_ALL";
    this.posting_delete = "POSTING_DELETE";
    this.posting_get_id = "POSTING_GET_ID";
    this.posting_update = "POSTING_UPDATE";
    this.posting_add = "POSTING_ADD";
  }
}
