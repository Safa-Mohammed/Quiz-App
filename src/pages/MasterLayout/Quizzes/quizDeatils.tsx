import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { MdOutlineEdit } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { axiosInstance } from "../../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Question {
  _id: string;
  title: string;
  description: string;
  options: Record<string, string>;
  answer: string;
  difficulty: string;
  points: number;
  type: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  schadule: string;
  duration: number;
  questions_number: number;
  score_per_question: number;
}

const QuizDetails: React.FC = () => {
  const location = useLocation();
  const quizFromState: Quiz | undefined = location.state?.quiz;

  // 🔹 State
  const [quiz, setQuiz] = useState<Quiz | null>(quizFromState || null);
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(quiz?.title || "");

  // 🟢 Fetch the question by ID
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const questionId = "68e455c35358146037d67d97"; // example ID
        const response = await axiosInstance.get(`/question/${questionId}`);
        setQuestionData(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchQuestion();
  }, []);

  // 🟠 Handle Edit (PUT request)
  const handleEdit = async () => {
    try {
      if (!quiz?._id) return;
      const response = await axiosInstance.put(`/quiz/${quiz._id}`, {
        title: newTitle,
      });
      toast.success("Quiz title updated successfully!");
      console.log(response);
      // Update local state so UI reflects new title
      setQuiz({ ...quiz, title: newTitle });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("Failed to update quiz title.");
    }
  };

  if (!quiz) {
    return (
      <div className="text-center text-gray-500 py-10">
        No quiz data found.
      </div>
    );
  }

  const formattedDate = dayjs(quiz.schadule).format("DD / MM / YYYY");
  const formattedTime = dayjs(quiz.schadule).format("hh : mm A");

  return (
   
    <div className="max-w-full p-2">
   <h3 className="text-[16px] font-medium mb-6 text-black">
  Quizzes <span className="text-[#C5D86D]">&gt;&gt;</span> Data Structures{" "}
    {quiz?.title}
</h3>


      <div className="max-w-md bg-white  shadow-lg rounded-xl border p-6">
    
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 ">
       Data Structures{" "} {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded-md px-2 py-1 ml-2"
          />
        ) : (
          quiz.title
        )}
      </h2>

      {/* Date & Time */}
      <div className="flex gap-3 text-gray-600 mb-4 items-center">
        <span className="flex items-center gap-3">
          <MdOutlineDateRange />
          {formattedDate}
        </span>

        <span className="flex items-center gap-3">
          <IoTimeSharp />
          {formattedTime}
        </span>
      </div>

      {/* Quiz Info */}
      <div className="space-y-3">
        {/* Duration */}
        <div className="relative flex justify-between rounded-lg overflow-hidden border w-full">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-[#FFEDDF] rounded-lg"></div>
          <span className="relative z-10 p-2 font-medium">Duration</span>
          <span className="relative z-10 p-2 font-normal">
            {quiz.duration || "10 minutes"}
          </span>
        </div>

        {/* Number of questions */}
        <div className="relative flex justify-between rounded-lg overflow-hidden border w-full mb-2">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-[#FFEDDF] rounded-lg"></div>
          <span className="relative z-10 p-2 font-medium">
            Number of questions
          </span>
          <span className="relative z-10 p-2 font-medium">
            {quiz.questions_number || 15}
          </span>
        </div>

        {/* Score per question */}
        <div className="relative flex justify-between overflow-hidden border w-full rounded-lg">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-[#FFEDDF] rounded-lg"></div>
          <span className="relative z-10 p-2 font-medium">
            Score per question
          </span>
          <span className="relative z-10 p-2 font-medium">
            {quiz.score_per_question || 1}
          </span>
        </div>

        {/* Description */}
        <div>
          <p className="font-medium bg-[#FFEDDF] p-2 rounded-lg">Description</p>
          <p className="text-gray-600 text-sm rounded-lg h-24 w-full border border-black p-2 bg-[#FFFF] overflow-auto">
            {quiz.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>
        </div>

        {/* 🟡 Question Bank */}
        <div className="relative flex justify-between rounded-lg overflow-hidden border w-full">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-[#FFEDDF] rounded-lg"></div>
          <span className="relative z-10 p-2">Question bank used</span>
          <span className="relative z-10 p-2 font-medium">
            {questionData ? questionData.title : "Loading..."}
          </span>
        </div>

        {/* Randomize */}
        <div className="flex items-center gap-2">
          <input type="checkbox" checked readOnly />
          <span>Randomize questions</span>
        </div>
      </div>

      {/* 🟢 Edit Button */}
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="mt-3 w-24 rounded-xl bg-green-600 text-white py-2 hover:bg-green-700 flex items-center justify-center gap-2"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-3 w-24 rounded-xl bg-black text-white py-2 hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <MdOutlineEdit />
            Edit
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default QuizDetails;
