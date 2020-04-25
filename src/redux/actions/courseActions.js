import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function saveCourseSuccess(course) {
  return { type: types.SAVE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(courseId) {
  return { type: types.DELETE_COURSE_SUCCESS, courseId };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(saveCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteCourse(courseId) {
  return function (dispatch) {
    return courseApi
      .deleteCourse(courseId)
      .then(() => {
        dispatch(deleteCourseSuccess(courseId));
      })
      .catch((error) => {
        throw error;
      });
  };
}
