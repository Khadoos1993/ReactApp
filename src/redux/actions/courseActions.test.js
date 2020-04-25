import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("should create LOAD_COURSES_SUCCESS when loading courses", () => {
    it("", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      });

      const expectedAction = [{ type: types.LOAD_COURSES_SUCCESS, courses }];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create course success action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.SAVE_COURSE_SUCCESS,
      course,
    };

    //act
    const action = courseActions.saveCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
