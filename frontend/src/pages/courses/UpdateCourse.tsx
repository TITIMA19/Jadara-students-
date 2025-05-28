import { useState, useEffect } from "react";
import { X, Edit } from "lucide-react";
import type { Course } from "../type/course";

interface UpdateCourseModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  onUpdate: (updatedCourse: Course) => void;
}

export default function UpdateCourse({
  isOpen,
  course,
  onClose,
  onUpdate,
}: UpdateCourseModalProps) {
  const [formData, setFormData] = useState<Course>({
    _id: "",
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (course && isOpen) {
      setFormData({
        _id: course._id,
        title: course.title,
        description: course.description,
      });
      setErrors({});
    }
  }, [course, isOpen]);

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3000/courses/${formData._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
        }),
      });

      if (response.ok) {
        const updatedCourse = await response.json();
        onUpdate(updatedCourse);
        onClose();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to update course. Please try again.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error while updating course. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen || !course) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center "
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Edit Course
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="course-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              id="course-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                errors.title 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="Enter course title..."
              disabled={isSubmitting}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="course-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="course-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-colors focus:outline-none focus:ring-2 resize-vertical ${
                errors.description 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="Enter course description..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                "Update Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}