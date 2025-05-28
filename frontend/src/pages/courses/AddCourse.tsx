import { useState } from "react";
import { Plus, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
interface Course {
  title: string;
  description: string;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export default function AddCourse() {
  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!course.title.trim()) {
      newErrors.title = "Title is required";
    } else if (course.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    } else if (course.title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    if (!course.description.trim()) {
      newErrors.description = "Description is required";
    } else if (course.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    } else if (course.description.trim().length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/courses/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          title: course.title.trim(),
          description: course.description.trim(),
        }),
      });

      if (response.ok) {
        const newCourse = await response.json();
        setSuccessMessage("Course added successfully!");
        setCourse({ title: "", description: "" });
        setErrors({});
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(errorData.message || errorData.error || "Failed to add course. Please try again.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const resetForm = () => {
    setCourse({ title: "", description: "" });
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleGoBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Add New Course
          </h1>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <span className="text-green-700 dark:text-green-300">{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span className="text-red-700 dark:text-red-300">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label 
              htmlFor="course-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Course Title
            </label>
            <input
              id="course-title"
              type="text"
              name="title"
              value={course.title}
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
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {course.title.length}/100 characters
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label 
              htmlFor="course-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Course Description
            </label>
            <textarea
              id="course-description"
              name="description"
              value={course.description}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white transition-colors focus:outline-none focus:ring-2 resize-vertical ${
                errors.description 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              rows={5}
              placeholder="Enter course description..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {course.description.length}/500 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !course.title.trim() || !course.description.trim()}
              className="flex-1 py-3 px-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Course...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 " />
                  Add Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}