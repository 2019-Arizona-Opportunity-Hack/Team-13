import React, { Component } from "react";

export default class Chatbot extends Component {
  render() {
    return (
      <div>
        <iframe
          className="m-3 float-right"
          allow="microphone;"
          width="200"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/b5a50151-4f30-45fe-8fd5-8e59e11d7f76"
        ></iframe>
      </div>
    );
  }
}
