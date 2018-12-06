import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Application from "./Application";

class ApplicationList extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">REACT</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>USCIS Form I-90</h3>
              <p>Application to Replace Permanent Resident Card</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to="#">
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">
                      Application Board{" "}
                    </i>
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Application Info</i>
                  </li>
                </Link>
                <Link to="">
                  <li className="list-group-item delete">
                    <i className="fa fa-minus-circle pr-1">
                      Delete Application
                    </i>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationList;
