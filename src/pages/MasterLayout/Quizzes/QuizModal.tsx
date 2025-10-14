import React from "react";
import { ModalHeader } from "../../../components/ModalHeader/ModalHeader";


type ModalProps = {
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onConfirm,
  children,
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
     <ModalHeader title={title} onClose={onClose} onConfirm={onConfirm} />
       <div className="p-4">{children}</div>
    </div>
  </div>
 
   
);

