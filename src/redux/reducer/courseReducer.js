import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.SAVE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.DELETE_COURSE_SUCCESS:
      return state.filter((course) => course.id !== action.courseId);
    default:
      return state;
  }
}