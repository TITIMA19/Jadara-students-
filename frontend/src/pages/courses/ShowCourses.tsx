import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import UpdateCourse from "./UpdateCourse";
import type { Course } from "../type/course";

export default function ShowCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/courses");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data.courses);
      setError(null);
    } catch (err) {
      console.error("Failed to load courses:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (course: Course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/courses/${courseToDelete._id}`, {
        method: 'DELETE',
      });

      console.log("Delete response status:", response.status);

      if (response.ok) {
        setCourses(courses.filter(course => course._id !== courseToDelete._id));
        closeDeleteModal();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to delete course. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course. Please try again.");
    }
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setShowUpdateModal(true);
  };

  const handleUpdate = (updatedCourse: Course) => {
    setCourses(prev =>
      prev.map(c => (c._id === updatedCourse._id ? updatedCourse : c))
    );
  };

  const navigateToAddCourse = () => {
    window.location.href = "/addCourse";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-600">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchCourses}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid mt-6 w-full shadow-md [&>div]:border [&>div]:rounded">
        <button
          type="button"
          onClick={navigateToAddCourse}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center gap-2 w-fit"
        >
          <Plus size={16} />
          Add Course
        </button>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
              <TableHead className="whitespace-nowrap min-w-[120px]">
                Title
              </TableHead>
              <TableHead className="min-w-[200px]">Description</TableHead>
              <TableHead className="whitespace-nowrap min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-hidden bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  No courses found. Add your first course to get started.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow
                  key={course._id}
                  className="group odd:bg-muted hover:bg-blue-50 transition-colors"
                >
                  <TableCell className="font-medium bg-background group-odd:bg-muted group-hover:bg-blue-100 whitespace-nowrap">
                    {course.title}
                  </TableCell>
                  <TableCell className="max-w-[300px] whitespace-normal break-words leading-relaxed py-4">
                    {course.description}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex gap-1">
                      <button
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"
                        title="Edit course"
                        onClick={() => openEditModal(course)}
                        aria-label={`Edit ${course.title}`}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                        title="Delete course"
                        onClick={() => openDeleteModal(course)}
                        aria-label={`Delete ${course.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <UpdateCourse
          isOpen={showUpdateModal}
          course={editingCourse}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />

        {showDeleteModal && courseToDelete && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Course
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>"{courseToDelete.title}"</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}