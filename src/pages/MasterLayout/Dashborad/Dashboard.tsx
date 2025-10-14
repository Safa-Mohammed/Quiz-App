 import { Link } from "react-router-dom";
 import img from '../../../assets/Images/img.png'
 import img1 from '../../../assets/Images/img.png'
 import img2 from '../../../assets/Images/img2.png'
 import img3 from '../../../assets/Images/img3.png'
 import img4 from '../../../assets/Images/img4.png'
 import quiz from '../../../assets/Images/quiz.png'
 import Quiz1 from '../../../assets/Images/Quiz1.png'
 import { ArrowRight } from "lucide-react";
 import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {DASHBOARDENDPOINTS} from '../../../services/EndPoints/EndPoints'
export default function Dashboard(){
const [students, setStudents] = useState<Student[]>([]);
const [quizzes, setQuizzes] = useState<Quiz[]>([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [studentData, setStudentData] = useState<studentData | null>(null);
const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

const [loading, setLoading] = useState(false);
const images = [img,img2, img3, img4, img1];
const Images = [quiz,Quiz1,quiz,Quiz1,quiz]
const token = Cookies.get("accessToken");

 type studentData = {
  first_name:string,
  last_name:string,
  email:string,
  avg_score:number,
  group:{name:string},
 _id:string
 };

  type Student = {
  _id: number;
  first_name: string;
  last_name:string,
  avg_score: number;
};


type Quiz = {
  _id: string;
  title: string;
  description?: string;
  startDate?: string;
  schadule:string,
  participants:string,
  difficulty:string,
  status:string,
  instructor:string,
  code:string
  
};
function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}




  const getUpcomingQuizzes = async () => {
    try {
      const response = await axios.get<Quiz[]>(
      DASHBOARDENDPOINTS.FirstFiveIncoming,
      { headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },}
      );
      setQuizzes(response.data);
            console.log("QUIZESSSSSSSSSSSSSSSSSSSSSSS",response.data)

    } catch (error) {
      console.error("Error fetching upcoming quizzes:", error);
    }
  };


  const getTopFiveStudents = async () => {
    try {
      const response = await axios.get(
        DASHBOARDENDPOINTS.TopFiveStudents,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      setStudents(response.data); 
      console.log("dataaaaaaaaaaaaaa",response.data)
    } catch (error) {
      console.error("Failed to fetch top students:", error);
    }
  };


   useEffect(() => {
    getTopFiveStudents();
    getUpcomingQuizzes();
  }, []);
  



  const openModal = async (id: number) => {
  
    setIsModalOpen(true);
    setLoading(true);
console.log("iddddddddddddd",id)
    try {
      const response = await axios.get<studentData>(DASHBOARDENDPOINTS.GETSTUDENTDETAILS(id),{
  headers: {
    Authorization: `Bearer ${token}`, 
  },

});
      setStudentData(response.data);
      console.log("studentdetails",response.data)
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  const openQuizModal = (_val: boolean) => {
  setIsQuizModalOpen(true);
};

  return (<div className="container mx-auto px-4 h-screen">
  {/* Parent wrapper: flex for desktop, stacked for mobile */}
  <div className="flex flex-col md:flex-row gap-6  items-start">
    {/* ========== Left Card: Upcoming 5 quizzes ========== */}


    <div className="flex-1 p-4 border-2 border-[#00000033] rounded-md bg-white flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-nunito font-bold text-[20px] leading-[100%] tracking-[0%]">
          Upcoming 5 quizzes
        </h2>

        <Link
          to="/dashboard/quiz"
          className="text-black text-[12px] hover:underline"
        >
          Quiz directory
        </Link>
      </div>
  
      {/* Card inside */}
      
      <div className="space-y-4 " >
       {quizzes.map((quiz,index) => (
        <div
          key={quiz._id}
          className="flex flex-col md:flex-row border-2 border-[#00000033] rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex-grow"
        >
       <img
       src={Images[index % images.length]}   
  
        alt="Card"
        className="w-full md:w-1/4 object-cover rounded-md"
      />
 
        <div className="p-3 flex flex-col justify-between md:w-3/4 ">
         
        <h2 className="font-nunito font-bold text-[18px] ">{quiz.title}</h2>     
        <h1 className="font-nunito font-medium text-[14px] text-black flex items-center gap-2">
  {/* Date */}
  <span className="text-gray-500">
    {new Date(quiz.schadule).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}
  </span>

  {/* Vertical line separator */}
  <span className="w-px h-5 bg-gray-500 inline-block"></span>

  {/* Time */}
  <span className="text-gray-500">
    {new Date(quiz.schadule).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>
</h1>


         

        <div className="flex justify-between items-center">
          <h1 className="font-nunito font-medium text-[14px] text-black">
          No. of student’s enrolled: {quiz.participants}
          </h1>


       <button
       onClick={() => { 
        openQuizModal(true);  
        setSelectedQuiz(quiz);   
      }}
      className="bg-white text-black py-2 px-4 rounded-lg font-nunito font-bold flex items-center justify-center gap-2 "
    >
      Open
      <span className="w-6 h-6 bg-[#C5D86D] text-white rounded-full flex items-center justify-center font-bold text-[16px]">
        ✓
      </span>
    </button>

      </div>


{isQuizModalOpen && selectedQuiz && (
  <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-2xl w-[400px] max-h-[80vh] overflow-auto shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#1F263E]">
        Quiz Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-[#1F263E] font-semibold mb-1">Title</label>
          <input
            type="text"
            value={selectedQuiz.title}
            readOnly
            className="w-full border-2 border-[#C5D86D] rounded-lg p-2 text-gray-700 focus:outline-none bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[#1F263E] font-semibold mb-1">Quiz ID</label>
          <input
            type="text"
            value={selectedQuiz._id}
            readOnly
            className="w-full border-2 border-[#C5D86D] rounded-lg p-2 text-gray-700 focus:outline-none bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[#1F263E] font-semibold mb-1">Quiz Code</label>
          <input
            type="text"
            value={selectedQuiz.code}
            readOnly
            className="w-full border-2 border-[#C5D86D] rounded-lg p-2 text-gray-700 focus:outline-none bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[#1F263E] font-semibold mb-1">Difficulty</label>
          <input
            type="text"
            value={selectedQuiz.difficulty}
            readOnly
            className="w-full border-2 border-[#C5D86D] rounded-lg p-2 text-gray-700 focus:outline-none bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[#1F263E] font-semibold mb-1">Status</label>
          <input
            type="text"
            value={selectedQuiz.status}
            readOnly
            className="w-full border-2 border-[#C5D86D] rounded-lg p-2 text-gray-700 focus:outline-none bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[#1F263E] font-semibold mb-1">Instructor</label>
          <input
            type="text"
            value={selectedQuiz.instructor}
            readOnly
            className="w-full border-2 border-[#C5D86D] rounded-lg p-2 text-gray-700 focus:outline-none bg-gray-50"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsQuizModalOpen(false)}
          className="px-6 py-2 bg-[#1F263E] text-white rounded-lg hover:bg-[#C5D86D] hover:text-black font-semibold transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>

    
   ))}
  </div>
</div>


    {/* ========== Right Card: Top 5 Students ========== */}
    <div className="flex-1 p-4 border-2 border-[#00000033] rounded-md bg-white flex flex-col h-auto md:h-[80%]">
      <div className="flex justify-between items-center mb-2 h[80%]">
        <h2 className="font-nunito font-bold text-[20px] leading-[100%] tracking-[0%]">
          Top 5 Students
        </h2>

        <Link
          to="/dashboard/student-list"
          className="flex items-center gap-1 text-black text-[12px] hover:text-[#C5D86D] transition"
        >
          All Students
          <ArrowRight size={25}  strokeWidth={4} color="#C5D86D" />
        </Link>
      </div>
        <div className="space-y-4" >
       {students.map((student,index) => (
        <div
          key={student._id}
          className=" md:h-[120px] flex flex-col md:flex-row border-2 border-[#00000033] rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex-grow"
        >
       <img
       src={images[index % images.length]}   
  
        alt="Card"
        className="w-full md:w-1/4 object-cover rounded-md"
      />

        <div className="p-4 flex flex-col justify-between md:w-3/4">
          <h2 className="font-nunito font-bold text-[18px] ">{student.first_name + " " +student.last_name}</h2>

          <div className="flex justify-between items-center ">
            <h1 className="font-nunito font-medium text-[13px] text-black">
              Class rank: : {getOrdinal(Math.floor(student.avg_score))}
            </h1>
              <div className="w-px h-6 bg-gray-400"></div>
             <h1 className="font-nunito font-medium text-[13px] text-black">
              Average score:{Math.round(student.avg_score)}%
            </h1>

   <button

        onClick={() => openModal(student._id)}
        className="text-black py-3 px-6 rounded-lg font-nunito font-bold text-[16px] flex items-center justify-center gap-3"
      >
        <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-bold text-[16px]">
          ✓
        </span>
      </button>

{isModalOpen && (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-2xl w-96 max-h-[80vh] overflow-auto">
      
      {/* Modal Header */}
      <div className="bg-[#C5D86D] text-black px-6 py-3 rounded-t-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">Student Details</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-black font-bold text-xl hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6 space-y-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : studentData ? (
          <div className="space-y-4 text-gray-800">

            {/* Name */}
            <div>
              <label className="block text-[#1F263E] font-semibold mb-1">Name</label>
              <input
                type="text"
                value={`${studentData.first_name} ${studentData.last_name}`}
                readOnly
                className="w-full border-2 border-[#C5D86D] rounded-lg p-2 bg-gray-50 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#1F263E] font-semibold mb-1">Email</label>
              <input
                type="text"
                value={studentData.email}
                readOnly
                className="w-full border-2 border-[#C5D86D] rounded-lg p-2 bg-gray-50 focus:outline-none"
              />
            </div>

            {/* Score */}
            <div>
              <label className="block text-[#1F263E] font-semibold mb-1">Score</label>
              <input
                type="text"
                value={`${studentData.avg_score}%`}
                readOnly
                className="w-full border-2 border-[#C5D86D] rounded-lg p-2 bg-gray-50 focus:outline-none"
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-[#1F263E] font-semibold mb-1">Student ID</label>
              <input
                type="text"
                value={studentData._id}
                readOnly
                className="w-full border-2 border-[#C5D86D] rounded-lg p-2 bg-gray-50 focus:outline-none"
              />
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-600">No data found</p>
        )}
      </div>

      {/* Modal Footer */}
      <div className="flex justify-end px-6 py-3 border-t border-gray-200">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-[#C5D86D] hover:text-black transition font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



          </div>
        </div>
      </div>
      ))}
        </div>
   
    </div>
  </div>
</div>


  )
}