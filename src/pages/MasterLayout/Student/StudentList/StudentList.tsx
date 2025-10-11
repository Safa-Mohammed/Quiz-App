import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import { fetchGroups, fetchStudents, fetchQuizResults } from "../../../../redux/slices/studentSlice";
import { FaEye } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../services/EndPoints/EndPoints";
import { studentImg } from "../../../../assets/Images";
import NoDataPage from "../../../../components/NoData/NoData";

const StudentsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, students, quizResults, loading, error } = useSelector(
    (state: RootState) => state.student
  );

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchStudents());
    dispatch(fetchQuizResults());
  }, [dispatch]);

  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]._id);
    }
  }, [groups, selectedGroup]);

  const filteredStudents = selectedGroup
    ? students
        .filter((student) =>
          selectedGroup === "ungrouped"
            ? !student.group
            : student.group?._id === selectedGroup
        )
        .map((student) => {
          const result = quizResults
            .find((q) => q.quiz?.group === student.group?._id)
            ?.participants?.find((p) => p.student?._id === student._id);
          return {
            ...student,
            score: result?.score || 0,
            classRank: result?.classRank || "-",
            img: result?.student?.img || student.img || studentImg,
          };
        })
    : [];

  // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleViewStudent = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/student/${id}`);
      setSelectedStudent(res.data);
    } catch {
      toast.error("Failed to fetch student details");
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Students List</h2>

      {/* Group Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {groups.map((group) => (
          <button
            key={group._id}
            onClick={() => {
              setSelectedGroup(group._id);
              setCurrentPage(1);
            }}
            className={`w-28 h-12 rounded-full text-sm font-medium border transition-all ${
              selectedGroup === group._id
                ? "bg-black text-white"
                : "bg-white border border-[#00000021] text-black hover:bg-gray-200"
            }`}
          >
            {group.name}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedGroup("ungrouped");
            setCurrentPage(1);
          }}
          className={`w-28 h-12 rounded-full text-sm font-medium border transition-all ${
            selectedGroup === "ungrouped"
              ? "bg-black text-white"
              : "bg-white border border-[#00000021] text-black hover:bg-gray-200"
          }`}
        >
          Ungrouped
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {currentStudents.length > 0 ? (
          currentStudents.map((student) => (
            <div
              key={student._id}
              className="flex items-center justify-between border shadow-sm hover:shadow-md transition rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={student.img}
                  alt={student.first_name}
                  className="w-24 h-24 object-cover border rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {student.first_name} {student.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{student.email}</p>
                  <p className="text-sm text-gray-700">
                    Score: {student.score} | Rank: {student.classRank}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleViewStudent(student._id)}
                className="text-gray-700 hover:text-black text-lg p-2"
              >
                <FaEye />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2">
            <NoDataPage />
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded ${
                currentPage === num ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Student Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-xl w-[45%] relative">
            <div className="flex items-center justify-between border-b border-black mb-4">
              <h2 className="text-xl font-semibold px-5">View Student</h2>
              <button
                className="text-black hover:text-black text-lg border-black border-l border-solid p-5"
                onClick={() => setSelectedStudent(null)}
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="px-5 py-3">
              <h2 className="text-lg font-semibold mb-4">
                {selectedStudent.first_name} {selectedStudent.last_name}
              </h2>
              <img
                src={selectedStudent.img || studentImg}
                alt={selectedStudent.first_name}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Group:</strong> {selectedStudent.group?.name || "Ungrouped"}</p>
              <p><strong>Score:</strong> {selectedStudent.score}</p>
              <p><strong>Class Rank:</strong> {selectedStudent.classRank}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
