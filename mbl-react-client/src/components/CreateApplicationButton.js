import React from "react";
import { Link } from "react-router-dom";

const CreateApplicationButton = () => {
  return (
    <React.Fragment>
      <Link to="/question/questionSequence" className="btn btn-lg btn-info">
        Start Application
      </Link>
    </React.Fragment>
  );
};

export default CreateApplicationButton;
