import React, { Component } from "react";
import ReactVirtualKeyboard from "../ReactVirtualKeyboard";

class ExampleOne extends Component {
  state = {
    model: {
      username: "",
      password: ""
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
        <h5 className="card-header bg-info">Exmple one:</h5>
        <div className="card-body">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="card mb-2">
              <div className="card-body">
                <form className="form-inline">
                  <label htmlFor="username" className="mr-2">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={model.username}
                    onFocus={e =>
                      this.setState({ currentInputElement: e.target })
                    }
                    onChange={e => {
                      this.update("username", e.target.value);
                    }}
                    autoFocus
                  />
                  <label className="mr-2 ml-3" htmlFor="password">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={model.password}
                    onFocus={e =>
                      this.setState({ currentInputElement: e.target })
                    }
                    onChange={e => {
                      this.update("password", e.target.value);
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExampleOne;
