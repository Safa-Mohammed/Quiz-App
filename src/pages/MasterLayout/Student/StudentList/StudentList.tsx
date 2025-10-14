import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { studentImg } from "../../../../assets/Images";
import NoDataPage from "../../../../components/NoData/NoData";
import { ModalHeader } from "../../../../components/ModalHeader/ModalHeader"; 
import {
  useGetGroupsQuery,
  useGetStudentsQuery,
  useGetQuizResultsQuery,
  useGetStudentByIdQuery,
  useDeleteStudentMutation,
} from "../../../../services/EndPoints/studentApi";

interface Group { _id: string; name: string; }
interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  img?: string;
  group?: Group;
  score?: number;
  classRank?: string | number;
}
interface QuizResult {
  quiz?: { group?: string };
  participants?: {
    student?: { _id: string; img?: string };
    score?: number;
    classRank?: string | number;
  }[];
}

const StudentsList: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | "ungrouped" | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const studentsPerPage = 4;

  const [deleteStudent] = useDeleteStudentMutation();

  const { data: groups = [], isLoading: groupsLoading, error: groupsError } = useGetGroupsQuery("");
  const { data: students = [], isLoading: studentsLoading, error: studentsError, refetch } =
    useGetStudentsQuery("");
  const { data: quizResults = [], isLoading: quizLoading, error: quizError } = useGetQuizResultsQuery("");
  const selectedStudentQuery = useGetStudentByIdQuery(selectedStudentId ?? "", { skip: !selectedStudentId });
  const selectedStudent = selectedStudentQuery.data;

  const viewModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedGroup && groups.length > 0) setSelectedGroup(groups[0]._id);
  }, [groups, selectedGroup]);

  if (groupsLoading || studentsLoading || quizLoading)
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (groupsError || studentsError || quizError)
    return <p className="text-center text-red-500 mt-6">Failed to fetch data. Please try again.</p>;

  const filteredStudents: Student[] = selectedGroup
    ? students
        .filter((student: Student) =>
          selectedGroup === "ungrouped" ? !student.group : student.group?._id === selectedGroup
        )
        .map((student: Student) => {
          const result = (quizResults as QuizResult[])
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

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleViewStudent = (id: string) => setSelectedStudentId(id);

  const handleCloseViewModal = () => {
    setSelectedStudentId(null);
  };

  const openDeleteModal = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent(studentToDelete._id).unwrap();
      toast.success("Student deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete student");
    } finally {
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {groups.map((group: Group) => (
          <button
            key={group._id}
            onClick={() => { setSelectedGroup(group._id); setCurrentPage(1); }}
            className={`w-28 h-12 rounded-full text-sm font-medium border transition-all ${
              selectedGroup === group._id
                ? "bg-black text-white"
                : "bg-white border border-gray-300 text-black hover:bg-gray-200"
            }`}
          >
            {group.name}
          </button>
        ))}
        <button
          onClick={() => { setSelectedGroup("ungrouped"); setCurrentPage(1); }}
          className={`w-28 h-12 rounded-full text-sm font-medium border transition-all ${
            selectedGroup === "ungrouped"
              ? "bg-black text-white"
              : "bg-white border border-gray-300 text-black hover:bg-gray-200"
          }`}
        >
          Ungrouped
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {currentStudents.length ? (
          currentStudents.map((student) => (
            <div key={student._id} className="flex items-center justify-between border shadow-sm hover:shadow-md transition rounded-lg">
              <div className="flex items-center gap-4">
                <img src={student.img} alt={student.first_name} className="w-24 h-24 object-cover border rounded-lg" />
                <div>
                  <h3 className="font-semibold text-gray-900">{student.first_name} {student.last_name}</h3>
                  <p className="text-sm text-gray-500">{student.email}</p>
                  <p className="text-sm text-gray-700">Score: {student.score} | Class Rank: {student.classRank}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pr-3">
                <button onClick={() => handleViewStudent(student._id)} className="text-gray-700 hover:text-black text-lg p-2"><FaEye /></button>
                {!student.group && (
                  <button
                    onClick={() => openDeleteModal(student)}
                    className="text-red-500 hover:text-red-700 text-lg p-2"
                    title="Delete Student"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2"><NoDataPage /></div>
        )}
      </div>

      {/* View Student Modal */}
 {selectedStudentId && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    onClick={() => setSelectedStudentId(null)} // overlay click closes modal
  >
    <div
      className="bg-white rounded-xl w-96 relative"
      onClick={(e) => e.stopPropagation()} // prevent inside clicks from closing
    >
      <ModalHeader
        title="View Student"
        onClose={() => setSelectedStudentId(null)} // X closes modal
      />

      {/* Render only if selectedStudent is available */}
      {selectedStudent ? (
        <div className="px-4 py-4">
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
          <p><strong>Score:</strong> {selectedStudent.score ?? "N/A"}</p>
          <p><strong>Class Rank:</strong> {selectedStudent.classRank ?? "-"}</p>
        </div>
      ) : (
        <p className="p-4 text-center text-gray-500">Loading student...</p>
      )}
    </div>
  </div>
)}



      {/* Delete Modal */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg w-96 shadow-lg p-2">
            <ModalHeader
              title="Delete Student"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDeleteStudent}
            />
            <div className="py-6 text-left px-2">
              <p className="text-gray-700">
                Are you sure you want to delete <strong>{studentToDelete.first_name} {studentToDelete.last_name}</strong>?
              </p>
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium ${currentPage === num ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsList;
