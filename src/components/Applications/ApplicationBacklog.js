import React, { Component } from "react";
import Question from "./../Questions/Question";

export default class ApplicationBacklog extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.question_list) {
      console.log(nextProps);
    }
  }
  render() {
    console.log(this.props);
    const { questions_list } = this.props;
    console.log(questions_list);
    const questions = questions_list.map(question => (
      <Question key={question.id} question={question} />
    ));
    return (
      <div>
        <h1>Application Backlog</h1>
        {questions}
      </div>
    );
  }
}
