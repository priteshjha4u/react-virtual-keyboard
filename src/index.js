import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactVirtualKeyboard from "./ReactVirtualKeyboard";

class App extends Component {
  state = {
    model: {
      username: "",
      password: "",
      phone: "",
      message:""
    },
    currentInputElement: null
  };
  update = (key, value) => {
    this.setState({ model: { ...this.state.model, [key]: value } });
  };
  render() {
    const { model, currentInputElement } = this.state;
    return (
      <div className="container-fluid demo-app">
        <div className="row">
          {/* full width keyboad example */}
          <div className="col-md-12">
            <div className="alert alert-primary text-center">
              <h3>A simple virtual keyboard built with react.</h3>
            </div>
            <div className="card">
              <h5 className="card-header">
                An inline form with full width keyboard
              </h5>
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
                          onChange={() => {}}
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
                            console.log(e);
                          }}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center px-2 py-2">
                  <ReactVirtualKeyboard
                    updateHandler={this.update}
                    input={currentInputElement}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* half width examples */}
        <div className="row mt-2">
            <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">
                By default numeric keyboard
              </h5>
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
                          onChange={() => {}}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center px-2 py-2">
                  <ReactVirtualKeyboard
                    updateHandler={this.update}
                    input={currentInputElement}
                  />
                </div>
              </div>
            </div>
            </div>
            <div className="col-md-6">
            
            <div className="card">
              <h5 className="card-header">
                Textarea example
              </h5>
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
                          onChange={() => {}}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center px-2 py-2">
                  <ReactVirtualKeyboard
                    updateHandler={this.update}
                    input={currentInputElement}
                  />
                </div>
              </div>
            </div>
            
            </div>
          </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
