import React, { Component } from "react";
import PropTypes from "prop-types";
import { getQuestions } from "./../../actions/questionActions";
import { filterQuestions } from "./../../actions/filterActions";
import { getResponses } from "./../../actions/responseActions";
import { createResponse } from "./../../actions/responseActions";
import classnames from "classnames";
import { connect } from "react-redux";
import Radio from "../QuestionTypes/Radio";
import Checkbox from "../QuestionTypes/Checkbox";
import Text from "../QuestionTypes/Text";
import Date from "../QuestionTypes/Date";
import DropDown from "../QuestionTypes/DropDown";
import Signature from "../QuestionTypes/Signature";

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
      security,
      questionChoices: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let { filteredQuestions, question, security } = nextProps;
    if (
      question.questionType &&
      (question.questionType.indexOf("radio") > -1 ||
        question.questionType.indexOf("check box") > -1)
    ) {
      const questionChoices = question.spanishText.split(" ").map(s => ({
        label: s,
        value: s,
        groupname: "group-" + question.id,
        selected: false
      }));
      this.setState({ questionChoices });
    }
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
    // userId-usFormNumber-questionNumberPart-questionNumber
    const userFormQuestionResponse =
      userId +
      "-" +
      usFormNumber +
      "-" +
      this.state.question.questionNumberPart +
      "-" +
      this.state.question.questionNumber;
    console.log(userFormQuestionResponse);
    const newResponse = {
      // id: this.state.response.id,
      applicationIdentifier: "1-I-90",
      questionSequence: this.state.question.questionSequence,
      usFormNumber: this.state.question.usFormNumber,
      spanishText: this.state.question.spanishText,
      responseText: this.state.responseText,
      userFormQuestionResponse,
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
    this.props.getResponses(this.props.security.user.id, "I-90");
    this.props.filterQuestions(userId, usFormNumber, this.props.history);
    this.props.history.push("/question/questionSequence");
  }

  onRadioChange(radio) {
    const questionChoices = this.state.questionChoices;
    questionChoices.forEach(r => {
      r.selected = false;
    });
    radio.selected = true;
    this.setState({ questionChoices, responseText: radio.value });
  }

  onCheckboxChange(checkbox) {
    const questionChoices = this.state.questionChoices;
    checkbox.selected = true;
    const responseText = questionChoices
      .filter(q => q.selected)
      .map(q => q.value)
      .join(",");
    this.setState({ questionChoices, responseText });
  }

  onDropDownChange(dropdown) {
    const questionChoices = this.state.questionChoices;
    dropdown.selected = true;
    const responseText = questionChoices
      .filter(q => q.selected)
      .map(q => q.value);
    this.setState({ questionChoices, responseText });
  }

  questionTypes({ errors, question, responseText, questionChoices }) {
    switch (question.questionType) {
      case "check box":
        return (
          <Checkbox
            checkboxes={questionChoices}
            onChange={this.onCheckboxChange}
          />
        );

      case "check box/text":
        return (
          <div>
            <Checkbox
              checkboxes={questionChoices}
              onChange={this.onCheckboxChange}
            />
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.responseText
              })}
              placeholder="Tu respuesta"
              name="responseText"
              value={responseText}
              onChange={this.onChange}
              required
            />
          </div>
        );
      case "drop down":
        return (
          <div>
            <DropDown
              dropdowns={questionChoices}
              onChange={this.onDropDownChange}
            />
            <input
              type="dropdown"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.responseText
              })}
              placeholder="Tu respuesta"
              name="responseText"
              value={responseText}
              onChange={this.onChange}
              required
            />
          </div>
        );
      case "radio":
        return <Radio radios={questionChoices} onChange={this.onRadioChange} />;
      case "radio/text":
        return (
          <div>
            <Radio radios={questionChoices} onChange={this.onRadioChange} />
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.responseText
              })}
              placeholder="Tu respuesta"
              name="responseText"
              value={responseText}
              onChange={this.onChange}
              required
            />
          </div>
        );
      case "text":
        return (
          <Text
            isValid={!!errors.responseText}
            responseText={responseText}
            onChange={this.onChange}
          />
          //   <input
          //     type="text"
          //     className={classnames("form-control form-control-lg", {
          //       "is-invalid": errors.responseText
          //     })}
          //     placeholder="Tu respuesta"
          //     name="responseText"
          //     value={responseText}
          //     onChange={this.onChange}
          //     required
          //   />
          // );
        );
      case "date/text":
        return (
          <Date
            isValid={!!errors.Date}
            responseText={Date}
            onChange={this.onChange}
          />
        );
      case "signature":
        return <Signature />;
      default:
        return <span>No idea how to {question.questionType}...</span>;
    }
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
    let { errors, question } = this.state;
    console.log(question);
    console.log(this.setState.questionChoices);

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
                  {this.questionTypes(this.state)}
                  {errors.responseText && (
                    <div className="invalid-feedback">
                      {errors.responseText}
                    </div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  disabled={!this.state.responseText}
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
