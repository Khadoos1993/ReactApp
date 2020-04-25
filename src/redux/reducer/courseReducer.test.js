import * as courseActions from "../actions/courseActions";
import courseReducer from "./courseReducer";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  //arrange
  const initialState = [
    {
      title: "A",
    },
    {
      title: "B",
    },
  ];

  const newCourse = {
    title: "C",
  };
  const actions = courseActions.saveCourseSuccess(newCourse);

  //act
  const newState = courseReducer(initialState, actions);

  //assert
  expect(newState.length).toEqual(3);
});
