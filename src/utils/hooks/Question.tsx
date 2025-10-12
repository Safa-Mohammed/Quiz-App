
import type { QuestionsInterface } from "../../Interfaces/Interfaces";
import { addQuestion, deleteQuestion, editQuestion, getAllQuestions, getQuestionById } from "../../services/Api/Questions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const  useAddQuestion = () => {
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: QuestionsInterface) => addQuestion(data),
        onSuccess: (data) => {
            toast.success(data.message || "Question has been added successfully");
            QueryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message);
        },
    });
}
export const useEditQuestion = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data:QuestionsInterface) => editQuestion(id, data),
    onSuccess: (data) => {
      toast.success(data.message || "Question has been updated successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id:string) => deleteQuestion(id),
    onSuccess: (data) => {
      toast.success(data.message || "Question has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
export const useGetAllQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
export const useGetQuestionById = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};