// src/components/ReusableModal.tsx
import { type ReactNode, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

interface ReusableModalProps { 
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const ReusableModal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ReusableModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl animate-scaleIn ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 
            id="modal-title"
            className="px-6 py-4 text-lg font-semibold text-gray-800 dark:text-white"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="mr-2 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-all"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(85vh-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;