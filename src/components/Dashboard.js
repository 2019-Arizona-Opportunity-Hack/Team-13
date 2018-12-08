import React, { Component } from "react";
import PropTypes from "prop-types";
import Application from "./Applications/Application";
import CreateApplicationButton from "./CreateApplicationButton";
import { connect } from "react-redux";
import { getQuestions } from "./../actions/questionActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuestions();
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
  getQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // projects: state.projects,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(Dashboard);
