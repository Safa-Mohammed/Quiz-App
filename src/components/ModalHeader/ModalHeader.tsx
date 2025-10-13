import { FiX, FiCheck } from "react-icons/fi";

type ModalHeaderProps = {
  title: string;
  onClose: () => void;   
  onConfirm?: () => void; 
};

export function ModalHeader({ title, onClose, onConfirm }: ModalHeaderProps) {
  return (
    <div className="flex flex-col border-b border-gray-300">
      <div className="flex justify-between items-center p-2">
        {/* Left: Title */}
        <h2 className="text-xl font-bold text-black mb-0">{title}</h2>

        {/* Right: Icons with separators */}
        <div className="flex items-center gap-2">
          <div className="w-px h-6 bg-gray-400"></div>
          <button onClick={onClose}>
            <FiX className="w-6 h-6 text-gray-600 hover:text-red-600" />
          </button>

          <div className="w-px h-6 bg-gray-400"></div>
          {onConfirm && (
            <button onClick={onConfirm}>
              <FiCheck className="w-6 h-6 text-gray-600 hover:text-green-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



export default function GroupsData() {
  return null; 
}
