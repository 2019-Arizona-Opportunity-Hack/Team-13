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
      <div class="projects">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4 text-center">MBL</h1>
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
