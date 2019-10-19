import React, { Component } from "react";
import PropTypes from "prop-types";
import { getQuestions } from "./../../actions/questionActions";
import { filterQuestions } from "./../../actions/filterActions";
import { getResponses } from "./../../actions/responseActions";
import { createResponse } from "./../../actions/responseActions";
import { connect } from "react-redux";
const QuestionResponse = React.lazy(() =>
  import("./../Questions/QuestionResponse")
);

class USForm extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.filterQuestions(
      this.props.security.user.id,
      "I-90",
      this.props.history
    );
  }
  render() {
    // console.log(this.props);
    // console.log(this.state);
    if (this.props.question !== undefined) {
      return (
        <div>
          <h1>USForm DEFINED</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading Next Question</h1>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  filteredQuestions: state.questions.filteredQuestions,
  questions: state.questions.questions,
  question: state.questions.question,
  responses: state.questions.responses,
  response: state.questions.response,
  security: state.security
});
export default connect(
  mapStateToProps,
  { createResponse, filterQuestions, getQuestions, getResponses }
)(USForm);
