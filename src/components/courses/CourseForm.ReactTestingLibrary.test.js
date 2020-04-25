import React from "react";
import { render, cleanup } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);
function renderCourseFrom(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  const { getByText } = renderCourseFrom();
  getByText("Add Course");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseFrom();
  getByText("Save");
});

it('should label save button as "Saving..." when not saving', () => {
  const { getByText, debug } = renderCourseFrom({ saving: true });
  //expect(wrapper.find('form').length).toBe(1);
  getByText("Saving...");
});
