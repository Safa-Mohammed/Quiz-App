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
