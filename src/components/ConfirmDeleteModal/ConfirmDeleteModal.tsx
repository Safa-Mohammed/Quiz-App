import React, { useEffect, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import deleteImage from "../../assets/Images/Delete.png";
import Loader from "../Loader/Loader";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title = "Delete Group",
  
  message = `Are you sure you want to delete this Group?`,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      cancelRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1321]/20 dark:bg-[#0D1321]/60 px-4 "
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl border border-[#00000033] overflow-hidden dark:bg-[#0D1321] dark:border dark:border-[#fff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b dark:border-[#fff] border-[#00000033] shadow-sm ">
          <h2 className="px-6 py-2 text-lg font-semibold text-gray-800 dark:text-[#fff]">
            {title}
          </h2>
          <div className="flex divide-x border-s border-[#00000033] dark:border-[#fff]">
            <button
              onClick={onConfirm}
              aria-label="Confirm delete"
              disabled={isLoading}
              className="w-12 h-12 flex items-center justify-center text-[#00000033] hover:bg-[#FFEDDF] transition dark:text-[#fff]"
            >
              <FiCheck size={20} />
            </button>
            <button
              onClick={onCancel}
              aria-label="Cancel delete"
              ref={cancelRef}
              className="w-12 h-12 flex items-center justify-center text-[#00000033] hover:bg-[#FFEDDF] transition dark:text-[#fff]"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
      {isLoading? (<Loader/>):(  <div className="px-6 py-6 text-[16px] text-gray-700 leading-relaxed text-center dark:text-[#fff]">
          <img
            src={deleteImage}
            alt="Delete Illustration"
            className="mx-auto mb-4 w-50 h-50 object-contain"
          />
          {message}
        </div>)}
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;