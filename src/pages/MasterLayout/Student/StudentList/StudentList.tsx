import React, { useState, useEffect } from "react"; // ✅ add useEffect
import { FaEye } from "react-icons/fa";
import { studentImg } from "../../../../assets/Images";
import NoDataPage from "../../../../components/NoData/NoData";
import { IoCloseOutline } from "react-icons/io5";
import {
  useGetGroupsQuery,
  useGetStudentsQuery,
  useGetQuizResultsQuery,
  useGetStudentByIdQuery,
} from "../../../../services/EndPoints/studentApi";

const StudentsList: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  // ✅ RTK Query Hooks
  const {
    data: groups = [],
    isLoading: groupsLoading,
    isError: groupsError,
  } = useGetGroupsQuery();

  const {
    data: students = [],
    isLoading: studentsLoading,
    isError: studentsError,
  } = useGetStudentsQuery();

  const {
    data: quizResults = [],
    isLoading: resultsLoading,
    isError: resultsError,
  } = useGetQuizResultsQuery();

  const {
    data: selectedStudent,
    isFetching: studentLoading,
    isError: studentError,
  } = useGetStudentByIdQuery(selectedStudentId!, { skip: !selectedStudentId });

  const loading = groupsLoading || studentsLoading || resultsLoading;

  // ✅ Automatically select first group after data is loaded
  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]._id);
    }
  }, [groups, selectedGroup]);

  // ✅ Filter students
  const filteredStudents = selectedGroup
    ? students
        .filter((student) =>
          selectedGroup === "ungrouped"
            ? !student.group
            : student.group?._id === selectedGroup
        )
        .map((student) => {
          const result = quizResults
            .find((q: any) => q.quiz?.group === student.group?._id)
            ?.participants?.find((p: any) => p.student?._id === student._id);

          return {
            ...student,
            score: result?.score || 0,
            classRank: result?.classRank || "-",
            img: result?.student?.img || student.img || studentImg,
          };
        })
    : [];

  const indexOfLast = currentPage * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfLast - studentsPerPage,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleViewStudent = (id: string) => {
    setSelectedStudentId(id);
  };

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (groupsError || studentsError || resultsError)
    return <p className="text-center text-red-500 mt-6">Failed to fetch data</p>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Students list</h2>
      </div>

      {/* Group Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {groups.map((group: any) => (
          <button
            key={group._id}
            onClick={() => {
              setSelectedGroup(group._id);
              setCurrentPage(1);
            }}
            className={`w-28 h-12 rounded-full text-sm font-medium border transition-all ${
              selectedGroup === group._id
                ? "bg-black text-white"
                : "bg-white border-solid border-[#00000021] text-black hover:bg-gray-200"
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
              : "bg-white border-solid border-[#00000021] text-black hover:bg-gray-200"
          }`}
        >
          Ungrouped
        </button>
      </div>

      {/* Students Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {currentStudents.length > 0 ? (
          currentStudents.map((student: any) => (
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
          <div className="col-span-2 py-2">
            <NoDataPage />
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 relative">
            <div className="flex items-center justify-between border-b border-black mb-4">
              <h2 className="text-xl font-semibold px-5">View Student</h2>
              <button
                className="text-black hover:text-black text-lg border-black border-l border-solid p-5"
                onClick={() => setSelectedStudentId(null)}
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="px-5 py-3">
              {studentLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h2>
                  <img
                    src={selectedStudent.img || studentImg}
                    alt={selectedStudent.first_name}
                    className="w-32 h-32 object-cover rounded-lg mb-4"
                  />
                  <p>
                    <strong>Email:</strong> {selectedStudent.email}
                  </p>
                  <p>
                    <strong>Group:</strong>{" "}
                    {selectedStudent.group?.name || "Ungrouped"}
                  </p>
                  <p>
                    <strong>Score:</strong> {selectedStudent.score}
                  </p>
                  <p>
                    <strong>Rank:</strong> {selectedStudent.classRank}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
