import { Check } from "lucide-react";
import { Folders } from "lucide-react";
type SuccessModalProps = {
  onClose: () => void;
  code?: string; 
};

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, code }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col items-center">

  <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition mb-4">
      <Check size={24} strokeWidth={3} />
    </div>



   <h2 className="text-2xl font-semibold mb-2">Quiz was successfully created</h2>
        
<div className="relative w-full">
  <input
    type="text"
    value={code}
    className="w-full rounded-lg border text-center  border-gray-300 px-4 py-2 focus:outline-none font-bold pl-20" 
  />
  <span className="absolute left-0 top-0 h-full flex rounded-lg items-center justify-center rounded-l-lg bg-[#FFEDDF] px-4 text-gray-700 pointer-events-none">
    code  
  </span>
    <span className="absolute right-0 top-0 h-full flex items-center justify-center gap-2  px-4 rounded-l-lg pointer-events-none">
        <Folders size={20} />
  
      </span>

</div>


 <button
          onClick={onClose}
  className="mt-6 px-4 py-2 bg-[#C5D86D] text-white rounded-lg hover:bg-gray-900 transition"
>
  Close
</button>

      </div>
    </div>
  );
};
