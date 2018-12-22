import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Application extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  downloadFileWithResponses = () => {
    fetch("http://localhost:8080/api/ver0001/1/my-form").then(response => {
      console.log(response);
      console.log(response.headers);
      const filename = response.headers
        .get("Content-Disposition")
        .split("filename=");
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      });
    });
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
                <button onClick={this.downloadFileWithResponses}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">
                      Print Application
                    </i>
                  </li>
                </button>
                <Link to="#">
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">View Questions</i>
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

export default Application;
