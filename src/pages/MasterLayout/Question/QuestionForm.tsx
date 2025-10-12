import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CircleLoader } from "react-spinners";
import ReusableModal from "../../../components/AddEditModal/AddEditModal";
import Loader from "../../../components/Loader/Loader";
import type { QuestionsInterface } from "../../../Interfaces/Interfaces";
import { questionSchema } from "../../../utils/Validation/Validations";

interface QuestionsFormProps {
  OnSubmit?: SubmitHandler<QuestionsInterface>;
  isModalOpen?: boolean;
  handleCloseModal?: () => void;
  onConfirm?: () => SubmitHandler<QuestionsInterface>;
  isPending: boolean;
  modalType: "add" | "edit";
  isEditing?: boolean;
  questionData?: QuestionsInterface;
  isLoading?: boolean;
}

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, scale: 0.9 },
};

const FIELD_CONFIG = {
  title: { label: "Title", type: "text", delay: 0.1 },
  description: { label: "Description", type: "textarea", delay: 0.2 },
  difficulty: { label: "Difficulty", type: "select", delay: 0.3 },
};

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const QuestionsForm: React.FC<QuestionsFormProps> = ({
  isLoading,
  OnSubmit,
  isModalOpen,
  handleCloseModal,
  onConfirm,
  isPending,
  modalType,
  isEditing,
  questionData,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionsInterface>({
    mode: "onChange",
    resolver: zodResolver(questionSchema),
  });

  // Default empty form data
  const emptyFormData = useMemo(
    () => ({
      title: "",
      description: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "",
      difficulty: "",
      type: "",
    }),
    []
  );

  // Reset form based on modal type
  useEffect(() => {
    if (!isModalOpen) return;

    if (modalType === "edit" && questionData) {
      reset({
        title: questionData.title || "",
        description: questionData.description || "",
        options: {
          A: questionData.options?.A || "",
          B: questionData.options?.B || "",
          C: questionData.options?.C || "",
          D: questionData.options?.D || "",
        },
        answer: questionData.answer || "",
        difficulty: questionData.difficulty || "",
        type: questionData.type || "",
      });
    } else if (modalType === "add") {
      reset(emptyFormData);
    }
  }, [modalType, isModalOpen, questionData, reset, emptyFormData]);

  // Clean up form when modal closes
  useEffect(() => {
    if (!isModalOpen && modalType === "add") {
      reset(emptyFormData);
    }
  }, [isModalOpen, modalType, reset, emptyFormData]);

  const modalTitle = useMemo(
    () => (modalType === "add" ? "Set up a new question" : "Edit question"),
    [modalType]
  );

  const isSubmitting = useMemo(
    () => (modalType === "add" ? isPending : isEditing),
    [modalType, isPending, isEditing]
  );

  // Render input field with label
  const renderInputField = (
    name: keyof QuestionsInterface,
    config: { label: string; type: string; delay: number },
    options?: { value: string; label: string }[]
  ) => {
    const error = errors[name];
    const inputId = name.toLowerCase();

    return (
      <AnimatePresence mode="popLayout">
        <motion.div
          role="listitem"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={ANIMATION_VARIANTS}
          transition={{ delay: config.delay, duration: 0.3 }}
          layout
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2 relative">
            <label
              className="min-w-[100px] font-medium text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg z-10"
              htmlFor={inputId}
            >
              {config.label}
            </label>

            {config.type === "textarea" ? (
              <textarea
                id={inputId}
                {...register(name)}
                aria-required="true"
                aria-label={config.label}
                rows={3}
                className="flex-1 p-2 ps-[110px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
              />
            ) : config.type === "select" ? (
              <select
                id={inputId}
                {...register(name)}
                aria-required="true"
                aria-label={config.label}
                className="flex-1 p-2 ps-[110px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
              >
                <option value="">Choose {config.label}</option>
                {options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={config.type}
                id={inputId}
                {...register(name)}
                aria-required="true"
                aria-label={config.label}
                className="flex-1 p-2 ps-[110px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
              />
            )}
          </div>
          {error && (
            <p className="text-red-500 text-xs ps-2">{error.message as string}</p>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Render option input (A, B, C, D)
  const renderOptionInput = (option: typeof OPTION_LABELS[number], index: number) => {
    const error = errors.options?.[option];

    return (
      <AnimatePresence mode="popLayout" key={option}>
        <motion.div
          role="listitem"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={ANIMATION_VARIANTS}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
          layout
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2 relative">
            <label
              className="w-[50px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-3 flex items-center justify-center rounded-lg z-10"
              htmlFor={`option${option}`}
            >
              {option}
            </label>
            <input
              id={`option${option}`}
              type="text"
              {...register(`options.${option}` as const, { required: true })}
              aria-required="true"
              aria-label={`Option ${option}`}
              className="flex-1 ps-[60px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs ps-2">{error.message as string}</p>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <ReusableModal
      title={modalTitle}
      isOpen={isModalOpen}
      onConfirm={onConfirm}
      onClose={handleCloseModal}
      className="w-[95%] md:w-[65%] mx-auto max-h-[85vh] overflow-y-auto"
    >
      {isLoading ? (
        <div className="flex h-[500px] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <form
          className="space-y-5 px-4 md:px-8 py-4"
          onSubmit={OnSubmit ? handleSubmit(OnSubmit) : undefined}
          aria-labelledby="form-title"
          autoComplete="off"
        >
          {/* Form Title */}
          <h5 id="form-title" className="mb-4 font-semibold text-xl" tabIndex={-1}>
            Question Details
          </h5>

          {/* Title Input */}
          {renderInputField("title", FIELD_CONFIG.title)}

          {/* Description Input */}
          {renderInputField("description", FIELD_CONFIG.description)}

          {/* Difficulty Select */}
          {renderInputField("difficulty", FIELD_CONFIG.difficulty, [
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ])}

          {/* Options Section */}
          <fieldset className="space-y-3" aria-labelledby="options-group">
            <legend id="options-group" className="font-semibold text-lg mb-2">
              Answer Options
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OPTION_LABELS.map((option, index) =>
                renderOptionInput(option, index)
              )}
            </div>
          </fieldset>

          {/* Right Answer & Category Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Right Answer */}
            <AnimatePresence mode="popLayout">
              <motion.div
                role="listitem"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={ANIMATION_VARIANTS}
                transition={{ delay: 0.8, duration: 0.3 }}
                layout
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2 relative">
                  <label
                    className="min-w-[110px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg z-10"
                    htmlFor="rightAnswer"
                  >
                    Right Answer
                  </label>
                  <select
                    id="rightAnswer"
                    {...register("answer", { required: true })}
                    aria-required="true"
                    aria-label="Right Answer"
                    className="flex-1 ps-[120px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
                  >
                    <option value="">Choose Answer</option>
                    {OPTION_LABELS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.answer && (
                  <p className="text-red-500 text-xs ps-2">
                    {errors.answer.message as string}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Category Type */}
            <AnimatePresence mode="popLayout">
              <motion.div
                role="listitem"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={ANIMATION_VARIANTS}
                transition={{ delay: 0.9, duration: 0.3 }}
                layout
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2 relative">
                  <label
                    className="min-w-[110px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg z-10"
                    htmlFor="categoryType"
                  >
                    Category Type
                  </label>
                  <select
                    id="categoryType"
                    {...register("type", { required: true })}
                    aria-label="Category Type"
                    className="flex-1 ps-[120px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
                  >
                    <option value="">Choose Type</option>
                    <option value="FE">FE</option>
                    <option value="BE">BE</option>
                    <option value="DO">DO</option>
                  </select>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs ps-2">
                    {errors.type.message as string}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <AnimatePresence mode="popLayout">
            <motion.div
              role="listitem"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={ANIMATION_VARIANTS}
              transition={{ delay: 1, duration: 0.3 }}
              layout
              className="flex justify-end mt-6 pt-4 border-t border-gray-200"
            >
              <button
                type="submit"
                aria-label={modalType === "add" ? "Add Question" : "Edit Question"}
                className={`px-6 py-2.5 main-text bg-[#FFEDDF] transition rounded-xl cursor-pointer flex items-center justify-center gap-2 min-w-[140px] font-medium ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#FFD8B9] active:scale-95"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>
                      {modalType === "add" ? "Adding..." : "Editing..."}
                    </span>
                    <CircleLoader color="#0D1321" size={18} />
                  </>
                ) : (
                  <span>
                    {modalType === "add" ? "Add Question" : "Edit Question"}
                  </span>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </form>
      )}
    </ReusableModal>
  );
};

export default QuestionsForm;