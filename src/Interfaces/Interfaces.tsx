 export type role="Instructor"|"Student"

export interface RegisterData{
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    role:role,
    _id:string
}
export interface RegisterResponce{
    message:string,
    data:RegisterData
}
// upcomming quiz
export interface Group {
  _id: string;
  name: string;
  students: string[];
}

export interface Quiz {
  _id: string;
  title: string;
  schadule: string;
  status: string;
  group: string;
}
//completed quiz
export interface Quiz {
  _id: string;
  title: string;
  description: string;
  code: string;
  status: string;
  group: string;
  questions_number: number;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  closed_at?: string;
  participants?: number;
}

export interface Group {
  _id: string;
  name: string;
}