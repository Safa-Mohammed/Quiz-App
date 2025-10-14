import React from "react";
import { FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";
import {
  useGetCompletedQuizzesQuery,
  useGetGroupsQuery,
} from "../../services/EndPoints/completedQuizApi";

  interface Quiz {
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

  interface Group {
  _id: string;
  name: string;
}



const CompletedQuizzesTable: React.FC = () => {
  const {
    data: quizzes = [],
    isLoading: quizzesLoading,
    error: quizzesError,
  } = useGetCompletedQuizzesQuery();

  const {
    data: groups = [],
    isLoading: groupsLoading,
    error: groupsError,
  } = useGetGroupsQuery();

  const loading = quizzesLoading || groupsLoading;
  const error =
    quizzesError || groupsError
      ? "Failed to fetch completed quizzes or groups."
      : "";

  const getGroupName = (groupId: string): string => {
    const group = groups.find((g: Group) => g._id === groupId);
    return group ? group.name : "Unknown Group";
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full   mx-auto mt-10 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Completed Quizzes</h2>
        <div className="flex items-center gap-2 font-medium cursor-pointer">
          <span className="text-black font-normal">Results</span>
          <FaArrowRight className="text-[#C5D86D]" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left rounded-lg">
          <thead className="bg-[#0D1321]">
            <tr className="text-white font-normal">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Group</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Students</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center border px-4 py-4 text-gray-500"
                >
                  No completed quizzes found.
                </td>
              </tr>
            ) : (
              quizzes.map((quiz: Quiz) => (
                <tr key={quiz._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">{quiz.title}</td>
                  <td className="border px-4 py-2">{getGroupName(quiz.group)}</td>
                  <td className="border px-4 py-2">
                    {quiz.closed_at
                      ? dayjs(quiz.closed_at).format("YYYY-MM-DD HH:mm")
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {quiz.participants ?? 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedQuizzesTable;