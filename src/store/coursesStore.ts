import { create } from "zustand";
import { CoursesState } from "@/types/state";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseByCourseNumber,
  getCourseByName,
} from "@/services/coursesService";

export const useCourseStore = create<CoursesState>((set) => ({
  courses: [] as Course[],
  setCourses: (courses) => set({ courses }),

  getCourses: async () => {
    const courses = await getCourses();
    set({ courses });
  },

  getCourseById: async (id: number): Promise<Course | null> => {
    const course = await getCourseById(id);
    if (!course) return null;
    set((state) => ({
      courses: state.courses.map((c) => (c.id === id ? course : c)),
    }));
    return course;
  },

  postCourse: async (course: Course): Promise<Course | null> => {
    try {
      const newCourse = await createCourse(course);
      if (newCourse) {
        set((state) => ({ courses: [...state.courses, newCourse] }));
        return newCourse;
      }
      return null;
    } catch (error) {
      console.error("Error creating course:", error);
      return null;
    }
  },

  putCourse: async (id: number, course: Course): Promise<Course | null> => {
    const updatedCourse = await updateCourse(id, course);
    if (!updatedCourse) return null;
    set((state) => ({
      courses: state.courses.map((c) => (c.id === id ? updatedCourse : c)),
    }));
    return updatedCourse;
  },

  deleteCourse: async (id: number) => {
    await deleteCourse(id);
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== id),
    }));
  },

  getCourseByCourseNumber: async (courseNumber: string) => {
    const course = await getCourseByCourseNumber(courseNumber);
    set((state) => ({
      courses: state.courses.map((c) =>
        c.courseNumber === courseNumber ? course : c
      ),
    }));
  },

  getCourseByName: async (name: string) => {
    const course = await getCourseByName(name);
    set((state) => ({
      courses: state.courses.map((c) => (c.name === name ? course : c)),
    }));
  },
}));
