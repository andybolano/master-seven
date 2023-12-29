export interface UserToken {
    token: string;
    user: User;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    school_class: SchoolClass
  }

  export interface SchoolClass {
    id: number;
    name: string;
  }
  