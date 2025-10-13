import React from "react";
import { FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";
import { Quizimg } from "../../../assets/Images";
import {
  useGetUpcomingQuizzesQuery,
  useGetGroupsQuery,
} from "../../../services/EndPoints/quizApi";

// upcomming quiz
  interface Group {
  _id: string;
  name: string;
  students: string[];
}

  interface Quiz {
  _id: string;
  title: string;
  schadule: string;
  status: string;
  group: string;
}


const UpcomingQuizzes: React.FC = () => {
  const {
    data: quizzesData,
    isLoading: quizzesLoading,
    error: quizzesError,
  } = useGetUpcomingQuizzesQuery(undefined);

  const {
    data: groupsData,
    isLoading: groupsLoading,
    error: groupsError,
  } = useGetGroupsQuery(undefined);

  if (quizzesLoading || groupsLoading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Loading quizzes...
      </div>
    );
  }

  if (quizzesError || groupsError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load quizzes.
      </div>
    );
  }

  const quizzes: Quiz[] = quizzesData || [];
  const groups: Group[] = groupsData || [];

  const quizzesWithStudents = quizzes.map((quiz) => {
    const foundGroup = groups.find((g) => g._id === quiz.group);
    return {
      ...quiz,
      studentsCount: foundGroup ? foundGroup.students.length : 0,
    };
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto mt-10 border">
      <h2 className="text-lg font-semibold mb-4">Upcoming quizzes</h2>

      {quizzesWithStudents.length === 0 ? (
        <p className="text-gray-500">No upcoming quizzes found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {quizzesWithStudents.map((quiz) => {
            const formattedDate = dayjs(quiz.schadule).format("DD/MM/YYYY");
            const formattedTime = dayjs(quiz.schadule).format("hh:mm A");

            return (
              <div
                key={quiz._id}
                className="flex items-center gap-4 border rounded-xl hover:shadow-md transition"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={Quizimg}
                    alt={quiz.title}
                    className="w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formattedDate} | {formattedTime}
                  </p>
                  <p className="text-sm mt-2">
                    No. of student’s enrolled:{" "}
                    <span className="font-semibold">
                      {quiz.studentsCount}
                    </span>
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 text-[#C5D86D] font-medium px-2">
                  {quiz.status === "open" ? "Open" : "Closed"} <FaArrowRight />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingQuizzes;
