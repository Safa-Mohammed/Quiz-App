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

export interface QuestionOption{
           A:string,
            B:string,
            C: string,
            D: string,
            _id: string
}
export interface QuestionsInterface {
    title:string;
    description:string;
    options:{
        A:string,
        B:string,
        C:string,
        D:string
    };
    answer:string;
    difficulty:string;
    type:string;
    _id?:string ; 
}

export interface QuestionsInterfaceRes{
    data:QuestionsInterface,
    message:string
}

export interface Quiz {
  randomize: boolean | undefined;
  _id: string;
  code: string;
  title: string;
  description: string;
  group: string;
  instructor: string;
  questions_number: number;
  questions: Question[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirstFiveIncoming {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: Question[];
  schedule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
}

export interface Question {
  _id: string;
  title: string;
  options: Option;
}

export interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface CompletedQuiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: Question[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
}

export interface CreateQuizPayload {
  title: string;
  description: string;
  group: string;
  questions_number: number;
  difficulty: string;
  type: string;
  schadule: string;
  duration: number;
  score_per_question: number;
}

export interface CreateQuizResponse {
  data: Quiz;
  message: string;
}