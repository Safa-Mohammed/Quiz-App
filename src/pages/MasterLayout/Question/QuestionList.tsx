
import { useState, useMemo, useCallback } from "react";
import QuestionsForm from "./QuestionForm";
import {
  useAddQuestion,
  useDeleteQuestion,
  useEditQuestion,
  useGetAllQuestions,
  useGetQuestionById,
} from "../../../utils/hooks/Question";
import { IoAddCircleSharp } from "react-icons/io5";
import Loader from "../../../components/Loader/Loader";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import SharedViewModal from "../../../components/SharedViewModal/SharedViewModal";
import type { QuestionsInterface } from "../../../Interfaces/Interfaces";
import Nodata from "../../../components/NoData/NoData";

const ITEMS_PER_PAGE = 8;
const DIFFICULTY_COLORS = {
  easy: "bg-green-100",
  medium: "bg-yellow-100",
  hard: "bg-red-100",
} as const;

const TYPE_COLORS = {
  FE: "bg-purple-100",
  DO: "bg-lime-100",
  BE: "bg-blue-100",
  DB: "bg-lime-100",
} as const;

const QuestionsList = () => {
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [questionId, setQuestionId] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");

  // Filter States
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  // API Hooks
  const { mutate: addQuestion, isPending: isAdding } = useAddQuestion();
  const { data: allData, isLoading: isLoadingQuestions } = useGetAllQuestions();
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteQuestion();
  const { data: questionData, isLoading: isLoadingQuestion } = useGetQuestionById(selectedId);
  const { mutate: editQuestion, isPending: isEditing } = useEditQuestion(questionId);

  // Memoized filtered questions
  const filteredQuestions = useMemo(() => {
    let filtered = allData || [];
    
    if (searchTitle.trim()) {
      filtered = filtered.filter((q: QuestionsInterface) =>
        q.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    
    if (filterType) {
      filtered = filtered.filter((q: QuestionsInterface) => q.type === filterType);
    }
    
    if (filterDifficulty) {
      filtered = filtered.filter((q: QuestionsInterface) => q.difficulty === filterDifficulty);
    }
    
    return filtered;
  }, [allData, searchTitle, filterType, filterDifficulty]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  // Event Handlers
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleAddNewQuestion = useCallback(() => {
    setModalType("add");
    setIsModalOpen(true);
  }, []);

  const handleEditQuestion = useCallback((id: string) => {
    setModalType("edit");
    setSelectedId(id);
    setQuestionId(id);
    setIsModalOpen(true);
  }, []);

  const handleViewQuestion = useCallback((id: string) => {
    setSelectedId(id);
    setOpenViewModal(true);
  }, []);

  const handleDeleteQuestion = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTitle("");
    setFilterType("");
    setFilterDifficulty("");
    setCurrentPage(1);
  }, []);

  const onSubmit = useCallback((data: QuestionsInterface) => {
    console.log('📝 Submitting question:', data);
    
    if (modalType === "add") {
      addQuestion(data, {
        onSuccess: (response) => {
          console.log('✅ Question added successfully:', response);
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error('❌ Failed to add question:', error);
        }
      });
    } else {
      editQuestion(data, {
        onSuccess: (response) => {
          console.log('✅ Question edited successfully:', response);
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error('❌ Failed to edit question:', error);
        }
      });
    }
  }, [modalType, addQuestion, editQuestion]);

  const handleConfirmDelete = useCallback(() => {
    if (deleteId) {
      deleteQuestion(deleteId, {
        onSuccess: () => setDeleteId(""),
        onError: () => setDeleteId(""),
      });
    }
  }, [deleteId, deleteQuestion]);

  const resetToFirstPage = useCallback(() => setCurrentPage(1), []);

  // Render Functions
  const renderDifficultyBadge = (difficulty: string) => (
    <span className={`inline-block py-1 px-3 sm:py-1.5 sm:px-5 rounded-2xl text-xs sm:text-sm dark:text-[#0D1321] ${DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || 'bg-gray-100'}`}>
      {difficulty}
    </span>
  );

  const renderTypeBadge = (type: string) => (
    <span className={`inline-block py-1 px-3 sm:py-1.5 sm:px-5 rounded-2xl text-xs sm:text-sm dark:text-[#0D1321] ${TYPE_COLORS[type as keyof typeof TYPE_COLORS] || 'bg-gray-100'}`}>
      {type}
    </span>
  );

  const renderActionButtons = (question: QuestionsInterface) => (
    <div className="flex justify-center space-x-2 sm:space-x-3">
      <button
        onClick={() => question._id && handleViewQuestion(question._id)}
        className="text-yellow-500 hover:text-yellow-600 transition p-1"
        aria-label={`View ${question.title}`}
        title="View"
      >
        <FaEye size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        onClick={() => question._id && handleEditQuestion(question._id)}
        className="text-blue-500 hover:text-blue-600 transition p-1"
        aria-label={`Edit ${question.title}`}
        title="Edit"
      >
        <FaEdit size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
      <button
        onClick={() => question._id && handleDeleteQuestion(question._id)}
        className="text-red-500 hover:text-red-600 transition p-1"
        aria-label={`Delete ${question.title}`}
        title="Delete"
      >
        <FaTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
    </div>
  );



  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <nav
        className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm py-5"
        aria-label="Pagination"
      >
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-100 dark:text-[#fff] transition"
          aria-label="Previous Page"
        >
          ‹
        </button>
        
        {currentPage > 2 && <span className="text-gray-400 px-1">...</span>}
        
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          if (page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1) {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition ${
                  currentPage === page
                    ? "bg-[#FFEDDF] main-text dark:text-[#0D1321] font-semibold"
                    : "text-gray-800 border-gray-300 hover:bg-gray-100 dark:text-[#fff] dark:bg-[#0D1321] hover:dark:text-[#0D1321]"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            );
          }
          return null;
        })}
        
        {currentPage < totalPages - 1 && <span className="text-gray-400 px-1">...</span>}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-100 dark:text-[#fff] transition"
          aria-label="Next Page"
        >
          ›
        </button>
      </nav>
    );
  };

  return (
    <div className="m-6 border border-gray-300 p-5 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Bank of Questions
        </h1>
        <button
          onClick={handleAddNewQuestion}
          className="flex items-center border p-2 px-4 border-[#00000033] rounded-xl bg-orange-50 hover:bg-orange-100 transition"
          aria-label="Add new question"
        >
          <IoAddCircleSharp size={25} className="me-2" />
          <span>Add Question</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={e => {
            setSearchTitle(e.target.value);
            resetToFirstPage();
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[200px] text-sm sm:text-base"
        />
        <select
          value={filterType}
          onChange={e => {
            setFilterType(e.target.value);
            resetToFirstPage();
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 dark:bg-[#0D1321] text-sm sm:text-base"
        >
          <option value="">All Types</option>
          <option value="FE">FE</option>
          <option value="BE">BE</option>
          <option value="DO">DO</option>
        </select>
        <select
          value={filterDifficulty}
          onChange={e => {
            setFilterDifficulty(e.target.value);
            resetToFirstPage();
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 dark:bg-[#0D1321] text-sm sm:text-base"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="px-4 sm:px-5 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-[#0D1321] dark:border dark:border-[#fff] dark:text-white hover:bg-orange-100 hover:dark:text-[#0D1321] transition text-sm sm:text-base"
        >
          Clear Filters
        </button>
      </div>

      {/* Responsive Table - Single View for All Screens */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden bg-gray-100 dark:bg-gray-900 p-2">
            <table className="min-w-full border-separate border-spacing-2">
              {/* Table Head */}
              <thead className="bg-[#0D1321] text-white">
                <tr>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-start text-xs font-medium uppercase rounded-lg">
                    Title
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-start text-xs font-medium uppercase rounded-lg hidden md:table-cell">
                    Description
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-center text-xs font-medium uppercase rounded-lg">
                    Difficulty
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-center text-xs font-medium uppercase rounded-lg">
                    Type
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-center text-xs font-medium uppercase rounded-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="text-[#000] dark:text-[#fff]">
                {paginatedQuestions.map((question: QuestionsInterface) => (
                  <tr
                    key={question._id}
                    className="transition-all"
                  >
                    <td className="px-3 sm:px-6 py-4 text-start bg-white dark:bg-gray-800 rounded-lg hover:bg-[#FFEDDF] dark:hover:bg-[#0D1321] transition-colors">
                      <div className="max-w-[150px] sm:max-w-none truncate" title={question.title}>
                        {question.title}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-start bg-white dark:bg-gray-800 rounded-lg hover:bg-[#FFEDDF] dark:hover:bg-[#0D1321] transition-colors hidden md:table-cell">
                      <div className="max-w-[250px] truncate" title={question.description}>
                        {question.description}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center bg-white dark:bg-gray-800 rounded-lg hover:bg-[#FFEDDF] dark:hover:bg-[#0D1321] transition-colors">
                      {renderDifficultyBadge(question.difficulty)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center bg-white dark:bg-gray-800 rounded-lg hover:bg-[#FFEDDF] dark:hover:bg-[#0D1321] transition-colors">
                      {renderTypeBadge(question.type)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center bg-white dark:bg-gray-800 rounded-lg hover:bg-[#FFEDDF] dark:hover:bg-[#0D1321] transition-colors">
                      <div className="flex justify-center space-x-2 sm:space-x-3">
                        <button
                          onClick={() => question._id && handleViewQuestion(question._id)}
                          className="text-yellow-500 hover:text-yellow-600 transition p-1"
                          aria-label={`View ${question.title}`}
                          title="View"
                        >
                          <FaEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                          onClick={() => question._id && handleEditQuestion(question._id)}
                          className="text-blue-500 hover:text-blue-600 transition p-1"
                          aria-label={`Edit ${question.title}`}
                          title="Edit"
                        >
                          <FaEdit size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                          onClick={() => question._id && handleDeleteQuestion(question._id)}
                          className="text-red-500 hover:text-red-600 transition p-1"
                          aria-label={`Delete ${question.title}`}
                          title="Delete"
                        >
                          <FaTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {isLoadingQuestions && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
                      <Loader />
                    </td>
                  </tr>
                )}
                
                {!isLoadingQuestions && paginatedQuestions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
                      <Nodata message="No questions found!" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        title="Delete Question"
        message="Are you sure you want to delete this Question?"
        isLoading={isDeleting}
        onCancel={() => setDeleteId("")}
        onConfirm={handleConfirmDelete}
      />

      {/* View Modal */}
      <SharedViewModal
        isOpen={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title="Question Details"
      >
        {isLoadingQuestion ? (
          <Loader />
        ) : (
          <>
            <div className="p-4 bg-gray-50 rounded-2xl overflow-y-auto">
              <h3 className="text-lg font-medium mb-4">Question</h3>
              <p className="mb-2">
                <span className="text-gray-600">Title:</span>{" "}
                <strong>{questionData?.title}</strong>
              </p>
              <p className="mb-2">
                <span className="text-gray-600">Description:</span>{" "}
                <strong>{questionData?.description}</strong>
              </p>
            </div>
            
            <div className="p-4 my-3 bg-gray-300 rounded-2xl">
              <h3 className="text-lg font-medium mb-4">Options</h3>
              {["A", "B", "C", "D"].map((opt) => (
                <p
                  key={opt}
                  className="flex items-center space-x-3 cursor-default hover:bg-gray-50 rounded p-2 transition"
                >
                  <span
                    className={`bg-gray-100 px-2 rounded-full font-semibold ${
                      questionData?.answer === opt ? "text-[#fff] bg-green-800" : ""
                    }`}
                  >
                    {opt}
                  </span>
                  <span className="flex items-center justify-between w-full">
                    <span>{questionData?.options?.[opt]}</span>
                    {questionData?.answer === opt && (
                      <span className="text-green-800 bg-green-100 p-1 font-semibold rounded-2xl px-2">
                        Correct Answer
                      </span>
                    )}
                  </span>
                </p>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-2xl grid grid-cols-2 gap-4 capitalize">
              <p>
                <span className="text-gray-600">Difficulty:</span>{" "}
                <strong>{questionData?.difficulty}</strong>
              </p>
              <p>
                <span className="text-gray-600">Type:</span>{" "}
                <strong>{questionData?.type}</strong>
              </p>
              <p>
                <span className="text-gray-600">Points:</span>{" "}
                <strong>{questionData?.points}</strong>
              </p>
              <p>
                <span className="text-gray-600">Status:</span>{" "}
                <strong>{questionData?.status}</strong>
              </p>
            </div>
          </>
        )}
      </SharedViewModal>

      {/* Add/Edit Form Modal */}
      <QuestionsForm
        modalType={modalType}
        handleCloseModal={handleCloseModal}
        isPending={isAdding}
        isEditing={isEditing}
        OnSubmit={onSubmit}
        isModalOpen={isModalOpen}
        questionData={modalType === "edit" ? questionData : undefined}
        key={modalType === "edit" ? questionData?._id : "add-form"}
        isLoading={modalType === "edit" && isLoadingQuestion}
      />
    </div>
  );
};

export default QuestionsList;