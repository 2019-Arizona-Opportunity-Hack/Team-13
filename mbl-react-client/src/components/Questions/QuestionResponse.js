import React, { Component } from "react";
import PropTypes from "prop-types";
import { getQuestion, getQuestions } from "./../../actions/questionActions";
import { filterQuestions } from "./../../actions/filterActions";
import { getResponses } from "./../../actions/responseActions";
import { createResponse } from "./../../actions/responseActions";
import classnames from "classnames";
import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";
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
    let { filteredQuestions, question, questions, responses, security } = props;

    this.state = {
      errors: {},
      filteredQuestions,
      question,
      previousQuestion: {},
      goBackResponses: [],
      questions,
      responses,
      responseText: "",
      security,
      questionChoices: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.onSignatureChange = this.onSignatureChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    let { filteredQuestions, question, questions, responses, security } = nextProps;
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
      questions,
      responses,
      responseText: "",
      security
    });
    if(this.state.goBackResponses.length === 0){
      this.setState({goBackResponses: responses});
    }
    if(!(Object.entries(this.state.previousQuestion).length === 0 && this.state.previousQuestion.constructor === Object)){
      this.setState({question: this.state.previousQuestion, responseText: this.state.previousQuestion.responseText});
    }
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
    console.log('this.state', this.state)
    this.props.getResponses(this.props.security.user.id, "I-90");
    this.props.filterQuestions(userId, usFormNumber, this.props.history);
    this.props.history.push("/question/questionSequence");
  }

  // I got help from here...https://coderwall.com/p/ebqhca/javascript-sort-by-two-fields
  // x and y are arrays, formatted like x = [x1, x2], y = [y1, y2]
  customSort(x, y){
    return x[0] - y[0] || this.customSortSub(x, y);
  }

  // x and y are arrays, formatted like x = [x1, x2], y = [y1, y2]
  customSortSub(x, y){
    // x[1] will always be a integer?
    var xInt = parseInt(x[1]);
    try{
      var yInt = parseInt(y[1]);
      // debugger;
      if (xInt < yInt) {
        return -1;
      }
      if (xInt > yInt) {
        return 1;
      }

      // x and y must be equal
      return 0;
    }
    catch(error){
        var yy = y[1].split(".");
        // if yy[0] is numeric
        if(!isNaN(yy[0])){
          var yyInt = parseInt(y);

          if (xInt < yyInt) {
            return -1;
          }
          if (xInt > yyInt) {
            return 1;
          }
          // x and yy must be equal
          return 0;
        }
    }
  }

  orderResponse(){
    if (this.props.responses !== undefined && this.props.responses.length > 0){
      console.log(this.props.responses);
      var responses = this.props.responses;
      var questionSequences = responses.map(a => a.questionSequence);
      var questionSequencesSplitDash = questionSequences.map(a => a.split('-'));
      // var test = questionSequencesSplitDash.filter(a => { 
      //   if(a[0] === "1"){
      //     return true
      //   } 
      //   return false
      // }).map(a => a).sort((x, y) => this.customSort(x, y));

      var test = questionSequencesSplitDash.sort((x, y) => this.customSort(x, y));

      console.log(test);
      debugger;
    }
  }

  goBack() {
    if (this.props.responses !== undefined && this.props.responses.length > 0){
      console.log(this.props.responses);
      var responses = this.props.responses;
      var questionSequences = responses.map(a => a.questionSequence);
      var questionSequencesSplitDash = questionSequences.map(a => a.split('-'));
      var sortedQuestionSequences = questionSequencesSplitDash.sort((x, y) => this.customSort(x, y)).map(a => a.join("-"));

      var previousQuestionResponse = responses.filter(a => {
        return a.questionSequence === sortedQuestionSequences[sortedQuestionSequences.length - 1];
      })[0];

      var previousQuestion = this.props.questions.filter(a => {
        return a.questionSequence === sortedQuestionSequences[sortedQuestionSequences.length - 1];
      })[0];

      if(previousQuestionResponse !== undefined && previousQuestion !== undefined){
        previousQuestion.responseText = previousQuestionResponse.responseText;

        this.setState({question: previousQuestion, 
          previousQuestion,
          responseText: previousQuestionResponse.responseText});
        console.log('this.state', this.state);
        // debugger;
      }
    }
    
    // this.state.getQuestion()
    console.log('this.state', this.state)
    // debugger;
    
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

  onSignatureChange(signature) {
    this.setState({ responseText: signature });
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
        return <Signature onChange={this.onSignatureChange} />;
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
        {/* {this.orderResponse()} */}
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <ProgressBar current={this.props.responses.length} total={this.props.questions.length} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 m-auto">
              <h5 className="text-center">
                {question.questionSequence}
                {console.log(question.spanishText)}
                {console.log(this.state.question)}
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
                <div className="row">
                  <button onClick={this.goBack.bind(this)} className="btn btn-primary btn-block mt-4 col-lg-5">Back</button>
                  <div className="col-lg-2"></div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4 col-lg-5"
                    disabled={!this.state.responseText}
                  />
                </div>
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
  { createResponse, filterQuestions, getQuestion, getQuestions, getResponses }
)(QuestionResponse);
