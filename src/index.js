import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactVirtualKeyboard from "./ReactVirtualKeyboard";

class App extends Component {
  state = {
    model: {
      username: "",
      password: ""
    }
  };
  update = (key, value) => {
    console.log(key, value);
    this.setState({ [key]: value });
  };
  render() {
    return (
      <div className="container">
        <ReactVirtualKeyboard updateHandler={this.update} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
