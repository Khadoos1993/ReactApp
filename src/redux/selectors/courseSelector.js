import { createSelector } from "reselect";
import { compare } from "../../components/common/HelperFunction";

const getCourses = (courses) => courses;

export const getCourseBySlug = createSelector(
  getCourses,
  (_, slug) => slug,
  (courses, slug) => courses.find((course) => course.slug == slug)
);

export const sortCoursesByTitle = createSelector(getCourses, (courses) =>
  courses.sort(compare)
);
