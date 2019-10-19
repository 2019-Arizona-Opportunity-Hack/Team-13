import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ApplicationBacklog from "./ApplicationBacklog";
import { getQuestions } from "./../../actions/questionActions";
import { getResponses } from "./../../actions/responseActions";

class ApplicationStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      responses: [],
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    // console.log(this.props);
    this.props.getQuestions();
    this.props.getResponses();
    this.props.filterQuestions();
  }
  render() {
    const { questions } = this.props;
    const { errors } = this.state;
    // console.log(errors);
    const questionAlgorithm = (errors, questions) => {
      // console.log(questions);
      if (questions.length < 1) {
        return (
          <div>
            <h1>Application Status</h1>
            <h2>Waiting On Questions</h2>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Application Status</h1>
            <ApplicationBacklog questions_list={questions} />
          </div>
        );
      }
    };
    let ApplicationContent = questionAlgorithm(errors, questions);
    return <div>{ApplicationContent}</div>;
  }
}

ApplicationStatus.propTypes = {
  questions: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  filteredQuestions: state.filteredQuestions,
  questions: state.questions.questions,
  responses: state.responses.responses,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getQuestions, getResponses }
)(ApplicationStatus);
