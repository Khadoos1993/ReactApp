import { createSelector } from "reselect";

const getCourses = (courses) => courses;

export const getCourseBySlug = createSelector(
  getCourses,
  (_, slug) => slug,
  (courses, slug) => courses.find((course) => course.slug == slug)
);
