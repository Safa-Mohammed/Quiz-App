import type { QuestionsInterface } from "../../Interfaces/Interfaces";
import { axiosInstance, QUESTIONS_URLS } from "../EndPoints/EndPoints";

export const addQuestion= async (data:QuestionsInterface) => {
      const response = await axiosInstance.post(QUESTIONS_URLS.ADD_QUESTION, data);
      return response.data;
};
export const editQuestion= async (id:string, data:QuestionsInterface) => {

      const response = await axiosInstance.put(QUESTIONS_URLS.UPDATE_QUESTION(id), data);
      return response.data;
};
export const deleteQuestion= async (id:string) => {
      const response = await axiosInstance.delete(QUESTIONS_URLS.DELETE_QUESTION(id));
      return response.data;
};


export const getAllQuestions = async () => {
      const response = await axiosInstance.get(QUESTIONS_URLS.GET_ALL_QUESTIONS);
      return response.data;
};
export const getQuestionById = async (id: string) => {
      const response = await axiosInstance.get(QUESTIONS_URLS.GET_QUESTION_BY_ID(id));
      return response.data;
};