import { QuizForm } from "./QuizForm";
import { Modal } from "./QuizModal";
import { useState } from "react";
import {SuccessModal} from "./SuccessModal"
type QuizModalContainerProps = {
  onClose: () => void;
};
export const QuizModalContainer: React.FC<QuizModalContainerProps> = ({ onClose }) => {
  const [openModal, setOpenModal] = useState<"form" | "success" | null>("form");
  const [savedData, setSavedData] = useState<any>(null);

  const handleFormSuccess = (responseData: any) => {
    setSavedData(responseData);
    console.log("responsedataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",responseData)
    setOpenModal("success");
  };

  return (
    <>

    {openModal === "form" && (
        < Modal title="Set up a new quiz" onClose={onClose}>
          <QuizForm onSuccess={handleFormSuccess} />
        </ Modal> )}


  {openModal === "success" && (
    <SuccessModal
        
          onClose={() => {
            setOpenModal(null); 
          }}
          code={savedData}  />)} 


    </>
  );
};
