import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ApplicationBacklog from "./ApplicationBacklog";
import { getQuestions } from "./../../actions/questionActions";

class ApplicationStatus extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    this.props.getQuestions();
  }
  render() {
    const { questions } = this.props;
    const { errors } = this.state;
    console.log(questions);
    const questionAlgorithm = (errors, questions) => {
      console.log(questions);
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
    return (
      <div>
        <h1>Application Status!</h1>
        {ApplicationContent}
      </div>
    );
  }
}

ApplicationStatus.propTypes = {
  questions: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  questions: state.questions.questions,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getQuestions }
)(ApplicationStatus);
