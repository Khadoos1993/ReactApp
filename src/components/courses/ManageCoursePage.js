import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { getCourseBySlug } from "../../redux/selectors/courseSelector";
import { toast } from "react-toastify";

export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    } else setCourse({ ...props.course });

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse({
      ...course,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    });
  }

  function isFormValid() {
    const { title, category, authorId } = course;
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!category) errors.category = "Category is required.";
    if (!authorId) errors.author = "Author is required.";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("course saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

function mapStateToProps({ courses, authors }, ownProps) {
  let slug = ownProps.match.params.slug;
  let course =
    slug && courses.length > 0 ? getCourseBySlug(courses, slug) : newCourse;
  return {
    course,
    courses,
    authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
