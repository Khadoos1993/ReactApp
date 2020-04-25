import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class CoursePage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }

  handleDelete = (course) => {
    this.props.actions
      .deleteCourse(course.id)
      .then(() => toast.success("course deleted"))
      .catch((error) =>
        toast.error("Delete failed. " + error, { autoClose: false })
      );
  };

  //   handleChange = (event) => {
  //     const course = { ...this.state.course, title: event.target.value };
  //     this.setState({ course });
  //   };

  //   handleSubmit = (event) => {
  //     event.preventDefault();
  //     this.props.actions.createCourse(this.state.course);
  //   };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add CourseList
        </button>
        <CourseList
          courses={this.props.courses}
          onDeleteClick={this.handleDelete}
        />
      </>
    );
  }
}

CoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

function mapStateToProps({ courses, authors }) {
  return {
    courses:
      authors.length === 0
        ? []
        : courses.map((course) => {
            return {
              ...course,
              authorName: authors.find((a) => a.id === course.authorId).name,
            };
          }),
    authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
