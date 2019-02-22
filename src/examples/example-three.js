import React, { Component } from "react";
import ReactVirtualKeyboard from "../ReactVirtualKeyboard";

class ExampleThree extends Component {
  state = {
    model: {
      message: ""
    },
    currentInputElement: null
  };
  update = (key, value) => {
    this.setState({ model: { ...this.state.model, [key]: value } });
  };
  render() {
    const { model, currentInputElement } = this.state;
    return (
      <div className="card border-info">
        <h5 className="card-header bg-info">Example Three:</h5>
        <div className="card-body">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="card mb-2">
              <div className="card-body">
                <form className="form-inline">
                  <label htmlFor="message" className="mr-2">
                    Message:
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="message"
                    name="message"
                    value={model.message}
                    onFocus={e =>
                      this.setState({ currentInputElement: e.target })
                    }
                    onChange={e => {
                      this.update("message", e.target.value);
                    }}
                    style={{ margin: "0px auto", height: "38px" }}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center px-2 py-2">
            <div className={window.innerWidth > 800 ? "w-75 p-3" : "w-100"}>
              <ReactVirtualKeyboard
                updateHandler={this.update}
                input={currentInputElement}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExampleThree;
