import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ExampleOne from "./examples/example-one";
import ExampleTwo from "./examples/example-two";
import ExampleThree from "./examples/example-three";
import ExampleFour from "./examples/example-four";

const App = () => {
  return (
    <React.Fragment>
      <div className="row fixed-top pt-2 pb-2 bg-dark text-white shadow">
        <div className="col-md-12">
          <h4 className="text-center">
            A simple virtual keyboard built with react.
          </h4>
        </div>
      </div>
      <div className="container-fluid demo-app">
        <div className="row mt-5">
          <div className="col-md-12">
            <ExampleOne />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <ExampleTwo />
          </div>

          <div className="col-md-6">
            <ExampleThree />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <ExampleFour />
          </div>
        </div>

      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
