import React, { Component } from "react";
import PropTypes from "prop-types";
import Application from "./Applications/Application";
import CreateApplicationButton from "./CreateApplicationButton";

class Dashboard extends Component {
  static propTypes = {
    prop: PropTypes
  };

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

export default Dashboard;
