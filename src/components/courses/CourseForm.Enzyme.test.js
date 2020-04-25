import React from "react";
import { shallow } from "enzyme";
import CourseForm from "./CourseForm";

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
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseFrom();
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it('labels save button as "Save" when not saving', () => {
  const wrapper = renderCourseFrom();
  //expect(wrapper.find('button').length).toBe(1);
  expect(wrapper.find("button").text()).toEqual("Save");
});

it('labels save button as "Saving..." when not saving', () => {
  const wrapper = renderCourseFrom({ saving: true });
  //expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find("button").text()).toEqual("Saving...");
});
