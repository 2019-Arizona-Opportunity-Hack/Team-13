import React from "react";
import { Link } from "react-router-dom";

const CreateApplicationButton = () => {
  return (
    <React.Fragment>
      <Link to="/question" className="btn btn-lg btn-info">
        Create a Application
      </Link>
    </React.Fragment>
  );
};

export default CreateApplicationButton;
