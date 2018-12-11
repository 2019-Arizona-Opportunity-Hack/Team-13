import React, { Component } from "react";
import PropTypes from "prop-types";
import { getQuestions } from "./../../actions/questionActions";
import { filterQuestions } from "./../../actions/filterQuestions";
import { getResponses } from "./../../actions/responseActions";
import { createResponse } from "./../../actions/responseActions";
import classnames from "classnames";
import { connect } from "react-redux";

export class QuestionResponse extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    let { filteredQuestions, question, questions, responses, security } = props;
    this.state = {
      errors: {},
      filteredQuestions,
      question: {
        id: question.id,
        questionText: question.questionText,
        spanishText: question.spanishText,
        questionInfo: question.questionInfo,
        xPlacement: question.xPlacement,
        yPlacement: question.yPlacement,
        pageOnForm: question.pageOnForm,
        partOfForm: question.partOfForm,
        questionNumber: question.questionNumber,
        questionNumberPart: question.questionNumberPart,
        questionSequence: question.questionSequence,
        usFormNumber: question.usFormNumber
      },
      responseText: "",
      security
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // let f = this.props.filteredQuestions;
    // let q = this.props.questions;
    // let r = this.props.responses;
    // console.log("f", f);
    // if (f.length < 1) {
    //   console.log("asdf");
    //   this.props.getQuestions();
    //   this.props.getResponses(
    //     this.props.security.user.id,
    //     "I-90"
    //     // this.props.history
    //   );
    // }
    // this.props.filterQuestions(q, r);
    if (nextProps.errors) {
      console.log(nextProps.errors);
    }
  }
  componentDidMount() {
    console.log(this.props);
    // console.log(this.props.questions);
    // console.log(this.props.responses);
    let f = this.props.filteredQuestions;
    let q = this.props.questions;
    let r = this.props.responses;
    console.log("f", f);
    if (f.length < 1) {
      console.log("QuestionResponse componentDidMount");
      this.props.getQuestions();
      this.props.getResponses(
        this.props.security.user.id,
        "I-90"
        // this.props.history
      );
      this.props.filterQuestions(q, r, this.props.history);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userId = this.state.security.user.id;
    const usFormNumber = this.state.response.usFormNumber;
    const newResponse = {
      // id: this.state.response.id,
      applicationIdentifier: this.state.response.applicationIdentifier,
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
    console.log(newResponse);
    this.props.createResponse(
      newResponse,
      userId,
      usFormNumber,
      this.props.history
    );
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    let { errors, question, responseText } = this.state;
    console.log(question);
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
