import React from "react";
import { deleteImg } from "../../assets/Images";

interface DeleteConfirmationProps {
  title: string; // e.g., "Delete Quiz"
  message: string; // e.g., "Are you sure you want to delete this quiz?"
  imgSrc?: string; // optional, defaults to deleteImg
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  title,
  message,
  imgSrc = deleteImg,
}) => {
  return (
    <div className="flex flex-col items-center justify-center   w-full h-full bg-body-secondary p-8">
      <img src={imgSrc} alt={title} className="w-44 h-44 " />
      <h3 className="text-2xl font-bold text-black pb-3">{title}</h3>
      <p className="text-gray-700 text-center">{message}</p>
    </div>
  );
};

export default DeleteConfirmation;
