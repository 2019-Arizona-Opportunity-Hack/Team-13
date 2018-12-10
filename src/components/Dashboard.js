import React, { Component } from "react";
import PropTypes from "prop-types";
import Application from "./Applications/Application";
import CreateApplicationButton from "./CreateApplicationButton";
import { connect } from "react-redux";
import { getQuestions } from "./../actions/questionActions";
import { getResponses } from "./../actions/responseActions";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getQuestions();
    this.props.getResponses(
      this.props.security.user.id,
      "I-90",
      this.props.history
    );
  }

  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">MBL</h1>
              <br />
              <CreateApplicationButton />
              <br />
              <hr />
              <Application />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // project: PropTypes.object.isRequired,
  getQuestions: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // projects: state.projects,
  // questions: state.questions
  security: state.security
});

export default connect(
  mapStateToProps,
  { getQuestions, getResponses }
)(Dashboard);
