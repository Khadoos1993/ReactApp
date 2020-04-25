import { getCourseBySlug } from "./courseSelector";
import { courses } from "../../../tools/mockData";

describe("course selector", () => {
  it("should return course when passed a slug", () => {
    //arrange
    const slug = "react-auth0-authentication-security";
    const expectedCourse = courses.find((course) => course.slug === slug);

    //act
    const course = getCourseBySlug(courses, slug);

    //assert
    expect(course).toEqual(expectedCourse);
  });
});
