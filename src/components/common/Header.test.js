import React from "react";
import { shallow, mount } from "enzyme";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

it("contains 3 navlinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;

  expect(numLinks).toBe(3);
});

it("contains 3 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toBe(3);
});
