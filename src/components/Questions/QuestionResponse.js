import React, { Component } from "react";
import PropTypes from "prop-types";
import { getQuestions } from "./../../actions/questionActions";
import { filterQuestions } from "./../../actions/filterActions";
import { getResponses } from "./../../actions/responseActions";
import { createResponse } from "./../../actions/responseActions";
import classnames from "classnames";
import { connect } from "react-redux";

export class QuestionResponse extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    let { filteredQuestions, question, security } = props;
    this.state = {
      errors: {},
      filteredQuestions,
      question,
      responseText: "",
      security
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let { filteredQuestions, question, security } = nextProps;
    this.setState({
      errors: {},
      filteredQuestions,
      question,
      responseText: "",
      security
    });
    if (nextProps.errors) {
      // console.log(nextProps.errors);
    }
  }
  componentDidMount() {
    // console.log(this.props);
    // console.log(this.state);
    this.props.filterQuestions(
      this.props.security.user.id,
      "I-90",
      this.props.history
    );
    // console.log("earl", this.state);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userId = this.state.security.user.id;
    const usFormNumber = this.state.question.usFormNumber;
    const newResponse = {
      // id: this.state.response.id,
      applicationIdentifier: "1-I-90",
      questionSequence: this.state.question.questionSequence,
      usFormNumber: this.state.question.usFormNumber,
      spanishText: this.state.question.spanishText,
      responseText: this.state.responseText,
      // submissionIdentifier: this.state.response.submissionIdentifier,
      xPlacement: this.state.question.xPlacement,
      yPlacement: this.state.question.yPlacement,
      pageOnForm: this.state.question.pageOnForm,
      partOfForm: this.state.question.partOfForm,
      questionNumber: this.state.question.questionNumber,
      questionNumberPart: this.state.question.questionNumberPart
    };
    // console.log(newResponse);
    this.props.createResponse(
      newResponse,
      userId,
      usFormNumber,
      this.props.history
    );
    this.props.getResponses(this.props.security.user.id, "I-90");
    this.props.filterQuestions(userId, usFormNumber, this.props.history);
    this.props.history.push("/question/questionSequence");
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
    let { errors, question, responseText } = this.state;
    // console.log(question);

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">
                {question.questionSequence}
                <br />
                {question.spanishText}
              </h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.responseText
                    })}
                    placeholder="Tu respuesta"
                    name="responseText"
                    value={responseText}
                    onChange={this.onChange}
                  />
                  {errors.responseText && (
                    <div className="invalid-feedback">
                      {errors.responseText}
                    </div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuestionResponse.proptypes = {
  errors: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  responses: PropTypes.object.isRequired
};

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
)(QuestionResponse);
