import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getMyForms } from "./../../actions/getMyFormActions";

class Application extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      myForm: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  async getMyForms() {
    try {
      const res = await axios.get(
        // "https://mbl-java-api.herokuapp.com/api/ver0001/1/my-form"
        "/1/my-form"
      );
      // console.log(res);
      // console.log(res.config);
      // console.log(res.status);
      // console.log(res.headers);
      // console.log(res.data);
      let a = document.createElement("a");
      a.href = res.data;
      a.download = "myPdf.pdf";
      a.click();
    } catch (err) {
      console.log(err);
    }
  }

  downloadFileWithResponses = () => {
    // this.getMyForms();
    let userId = this.props.security.user.id;
    let jwtToken = null;
    if (typeof Storage !== "undefined") {
      if (localStorage.hasOwnProperty("jwtToken")) {
        jwtToken = localStorage.jwtToken;
      }
    }
    // console.log(userId);
    // fetch(`https://mbl-java-api.herokuapp.com/api/ver0001/${userId}/my-form`, {
    fetch(`/${userId}/my-form`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken
      }
    }).then(response => {
      // console.log(response);
      const filename = response.headers
        .get("Content-Disposition")
        .split("filename=");
      response.blob().then(blob => {
        // console.log(blob);
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

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { getMyForms }
)(Application);
