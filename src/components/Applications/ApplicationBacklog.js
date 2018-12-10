import React, { Component } from "react";
import Question from "./../Questions/Question";

class ApplicationBacklog extends Component {
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.questions_list) {
      console.log(nextProps);
    }
  }
  render() {
    // console.log(this.props);
    const { questions_list } = this.props;
    // console.log(questions_list);
    const questions = questions_list.map(question => (
      <Question key={question.id} question={question} />
    ));
    let unansweredQ = [];
    let answeredQ = [];

    for (let i = 0; i < questions.length; i++) {
      //if question[i].questionSequence !== response[i].questionSequence
      // unansweredQ.push(question[i])
      // else if response[i].confirmed === false
      // answeredQ.push(question[i])
      if (questions[i]) {
        unansweredQ.push(questions[i]);
      }
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {unansweredQ.length}
            {unansweredQ.slice(0, 5)}
          </div>
          <div className="col-md-6">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Listo</h3>
              </div>
            </div>
            {answeredQ.length}
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationBacklog;
