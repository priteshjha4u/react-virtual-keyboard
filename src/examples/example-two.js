import React, { Component } from "react";
import ReactVirtualKeyboard from "../ReactVirtualKeyboard";

class ExampleTwo extends Component {
  state = {
    model: {
      phone: ""
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
        <h5 className="card-header bg-info">Example two:</h5>
        <div className="card-body">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="card mb-2">
              <div className="card-body">
                <form className="form-inline">
                  <label htmlFor="phone" className="mr-2">
                    Phone:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={model.phone}
                    onFocus={e =>
                      this.setState({ currentInputElement: e.target })
                    }
                    onChange={e => {
                      this.update("phone", e.target.value);
                    }}
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
                options={{ alphabet: false }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExampleTwo;
