import  {QuizModalContainer} from'./Modalcontainer'
import newQuizicon from "../../../assets/Images/new quiz icon.png"
import VaultIcon from "../../../assets/Images/Vault icon.png"
import { useState } from 'react';
import ReactDOM from "react-dom";



const Quizzes = () => {
  const [showQuizModalContainer, setShowQuizModalContainer] = useState(false);

  return (
    <>
<div className="fixed top-50 left-100 p-4 flex gap-8 items-center quizIcons">

  <div
  className="border-2 rounded-lg flex flex-col  items-center justify-center gap-2 p-8 cursor-pointer"
  onClick={() => setShowQuizModalContainer(true)}
>
  <img
    src={newQuizicon}
    alt="Add new quiz"
    className="w-10 h-10"
  />
  <h2 className="font-semibold font-Nunito text-[20px]">
    Set up a new quiz
  </h2>
</div>

{/* {showQuizModalContainer && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center ">
    <QuizModalContainer onClose={() => setShowQuizModalContainer(false)} />
  </div>
)} */}



{showQuizModalContainer &&
  ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0  bg-opacity-50"
        onClick={() => setShowQuizModalContainer(false)}
      ></div>

     
      <div className="relative z-10">
        <QuizModalContainer onClose={() => setShowQuizModalContainer(false)} />
      </div>
    </div>,
    document.body
  )}

  {/* Second icon + text */}
  <div className="flex  flex-col items-center gap-2 p-8 border-2 rounded-lg">
    <img src={VaultIcon} alt="Question Bank" className="w-10 h-10" />
    <h2 className="font-semibold font-Nunito text-[20px]">Question Bank</h2>
  </div>
</div>

 
 
    </>
  );
};

export default Quizzes;
