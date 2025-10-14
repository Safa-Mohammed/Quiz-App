import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizModalContainer } from "./Modalcontainer";
import newQuizicon from "../../../assets/Images/new quiz icon.png";
import VaultIcon from "../../../assets/Images/Vault icon.png";
import { CompletedQuizzesTable, UpcomingQuizzes } from "../../../components";

const Quizzes = () => {
  const [showQuizModalContainer, setShowQuizModalContainer] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white">
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-6">
        {/* TWO BUTTONS IN A ROW */}
        <div className="flex flex-row items-center justify-center gap-6">
          {/* Set up a new quiz */}
          <div
            className="border-2 rounded-lg flex flex-col items-center justify-center gap-2 p-8 cursor-pointer hover:bg-gray-50 w-full"
            onClick={() => setShowQuizModalContainer(true)}
          >
            <img src={newQuizicon} alt="Add new quiz" className="w-10 h-10" />
            <h2 className="font-semibold font-Nunito text-[20px]">
              Set up a new quiz
            </h2>
          </div>

          {/* Question Bank */}
          <div
            className="border-2 rounded-lg flex flex-col items-center justify-center gap-2 p-8 cursor-pointer hover:bg-gray-50 w-full"
            onClick={() => navigate("/dashboard/questionList")}
          >
            <img src={VaultIcon} alt="Question Bank" className="w-10 h-10" />
            <h2 className="font-semibold font-Nunito text-[20px]">
              Question Bank
            </h2>
          </div>
        </div>

        {/* Quiz Modal */}
        {showQuizModalContainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <QuizModalContainer onClose={() => setShowQuizModalContainer(false)} />
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col gap-1">
        <UpcomingQuizzes />
        <CompletedQuizzesTable />
      </div>
    </div>
  );
};

export default Quizzes;
