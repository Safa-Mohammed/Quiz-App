import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import {QUIZZES_URL} from '../../../services/EndPoints/EndPoints'
import Cookies from "js-cookie";

type FormData = {
  title: string;
  duration: string;
  questions_number: string;
  score_per_question: string;
  description: string;
  schadule: string;
  difficulty: string;
  type: string;
  group: string;
};

interface FormProps {
  onSuccess: (responseData: any) => void;

}


export const QuizForm: React.FC<FormProps> = ({ onSuccess}: FormProps)  => {
  const [date, setDate] = useState("");   
  const [time, setTime] = useState(""); 
  const [_savedQuiz, setSavedQuiz] = useState<any>(null);
  const token = Cookies.get("accessToken");
  const groupOptions = [
  { id: "68ea3afd5358146037d7869b", name: "Node Advanced" },
  { id: "65c2bed779b859ea9320885f", name: "Introduction to DSA Fundamentals" },
  { id: "68ea3b075358146037d786a0", name: "DSA Advanced" },
];
  const [formData, setFormData] = useState<FormData>({
  title: "",
  duration: "",
  questions_number: "",
  score_per_question: "",
  description: "",
  schadule: "", 
  difficulty: "",
  type: "",
  group: "",
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const schadule = `${date}T${time}:00`;
    const dataToSend = {
    ...formData,
    schadule,
  };
  console.log('Sending POST request to /api/quiz with data:', dataToSend);

  try {
    const response = await axios.post(QUIZZES_URL.CREATE_NEW_QUIZE, dataToSend, {
    headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
    },
    
    });
    setSavedQuiz({schedule: response.data.data.code});
     console.log('codeeeeeeeeeeeeeeeee:',response.data.data.code);
    onSuccess(response.data.data.code);
    console.log('Success:', response.data);
    toast.success("Quiz added successfully")
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      toast.error("Something went wrong",error.response.data)
    }  
    else {
      console.error('Error:', error.message);
    }
  }
};



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
 
<label className="block font-medium mb-1">Details</label>

<div className="flex w-full border rounded-lg overflow-hidden">

  <span className="flex items-center justify-center px-4 bg-[#FFEDDF] text-gray-700 whitespace-nowrap">
    Title
  </span>

  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
    placeholder=""
  />
</div>

    </div>

      {/* Duration + Num Questions + Score */}
      <div className="grid grid-cols-3 gap-3">
  {/* Duration */}
  <div className="flex items-center">
    <label
      className="bg-[#FFEDDF] text-gray-600 font-medium px-3 py-2 rounded-l-lg whitespace-nowrap"
    >
      Duration (min)
    </label>
    <select
      name="duration"
      value={formData.duration}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-r-lg px-3 py-2  focus:outline-none"
    >
      <option value="">10</option>
      {[5, 10, 15, 20].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>

  {/* No. Questions */}
  <div className="flex items-center">
    <label
      className="bg-[#FFEDDF] text-gray-600 font-medium px-3 py-2 rounded-l-lg whitespace-nowrap"
    >
      No. Questions
    </label>
    <select
      name="questions_number"
      value={formData.questions_number}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-r-lg px-3 py-2  focus:outline-none"
    >
      <option value="">15</option>
      {[1, 10, 15, 20].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>

  {/* Score per Question */}
  <div className="flex items-center">
    <label
      className="bg-[#FFEDDF] text-gray-600 font-medium px-3 py-2 rounded-l-lg whitespace-nowrap"
    >
      Score/Q
    </label>
    <select
      name="score_per_question"
      value={formData.scorePerQuestion}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-r-lg px-3 py-2  focus:outline-none"
    >
      <option value="">5</option>
      {[1, 2, 5, 10].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>
</div>



 {/* Description */}
<div className="relative w-full flex">
  {/* Label area (left side) */}
  <span className="flex items-center justify-center px-4 bg-[#FFEDDF] text-gray-600 rounded-l-lg border border-gray-300 border-r-0 min-w-[120px]">
    Description
  </span>

  {/* Textarea */}
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    rows={3}
    className="w-full border border-gray-300 rounded-r-lg px-3 py-2 bg-transparent focus:outline-none resize-none"
  />
</div>


  <div className="flex items-center w-full border rounded-lg overflow-hidden">
        <div className="flex w-full border rounded-lg overflow-hidden">
          <span className="flex items-center justify-center px-4 bg-[#FFEDDF] text-gray-700">
            Schedule
          </span>

          <div className="flex items-center flex-1 px-3 py-2 gap-4 bg-transparent">
            <input
              type="date"
              className="bg-transparent focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="bg-transparent focus:outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>


      {/* Difficulty + Category + Group */}
      
   <div className="grid grid-cols-3 gap-3">
  {/* Difficulty */}
  <div className="flex">
    <label
      className="flex items-center justify-center bg-[#FFEDDF] text-gray-800 font-medium px-3 rounded-l-lg border border-gray-300 border-r-0"
    >
      Difficulty
    </label>
    <select
      name="difficulty"
      value={formData.difficulty}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none "
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
      
    </select>
  </div>

  {/* Category */}
  <div className="flex">
    <label
      className="flex items-center justify-center bg-[#FFEDDF] text-gray-800 font-medium px-3 rounded-l-lg border border-gray-300 border-r-0"
    >
      Category
    </label>
    <select
      name="type"
      value={formData.type}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none "
    >
  
       <option value="FE">FE</option>
      <option value="BE">BE</option>
      <option value="DO">DO</option>
    </select>
  </div>

  {/* Group Name */}
  <div className="flex">
    <label
      className="flex items-center justify-center bg-[#FFEDDF] text-gray-800 font-medium px-3 rounded-l-lg border border-gray-300 border-r-0"
    >
      Group Name
    </label>
    <select
  name="group"
  value={formData.group}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none"
>

  {groupOptions.map((group) => (
    <option key={group.id} value={group.id}>
      {group.name}
    </option>
  ))}
</select>

  </div>
</div>

      {/* Submit */}
  <div className="flex justify-end mt-4">
  <button 
    type="submit"
    className="px-4 py-2 bg-[#FFEDDF] text-[#070606] rounded hover:text-gray-700"
  >
    Submit
  </button>
</div>

    </form>
  );
};
