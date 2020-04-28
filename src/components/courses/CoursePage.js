import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { sortCoursesByTitle } from "../../redux/selectors/courseSelector";

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToAddCoursePage: false,
      courses: this.props.courses,
    };
  }

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

  componentDidUpdate(prevProps) {
    if (prevProps.courses !== this.props.courses)
      this.setState((state, props) => ({
        ...state,
        courses: props.courses,
      }));
  }

  filterByAuthor = ({ target }) => {
    this.setState((state, props) => ({
      ...state,
      courses: props.courses,
    }));

    this.setState((state) => ({
      ...state,
      courses: state.courses.filter(
        (course) => course.authorName === target.value
      ),
    }));
  };

  handleDelete = (course) => {
    this.props.actions
      .deleteCourse(course.id)
      .then(() => toast.success("course deleted"))
      .catch((error) =>
        toast.error("Delete failed. " + error, { autoClose: false })
      );
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <div className="row">
          <div className="col-sm-4">
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add CourseList
            </button>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <select
                style={{ marginBottom: 20 }}
                className="form-control"
                onChange={this.filterByAuthor}
              >
                <option value="">Change Author</option>
                {this.props.authors.map((author) => {
                  return (
                    <option key={author.name} value={author.name}>
                      {author.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <CourseList
          courses={this.state.courses}
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
        : sortCoursesByTitle(
            courses.map((course) => {
              return {
                ...course,
                authorName: authors.find((a) => a.id === course.authorId).name,
              };
            })
          ),
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
