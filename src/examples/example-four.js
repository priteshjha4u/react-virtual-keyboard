import React, { Component } from "react";
import ReactVirtualKeyboard from "../ReactVirtualKeyboard";

class Example extends Component {
  state = {
    model: {
      number1: "",
      number2: ""
    },
    currentInputElement: null,
    action: "ADD",
    answer: null
  };
  timeout = null;
  update = (key, value) => {
    this.setState({ model: { ...this.state.model, [key]: value } });
  };
  handleChange = e => {
    this.setState({ action: e.target.value });
  };
  render() {
    const { model, currentInputElement, answer } = this.state;
    return (
      <div className="card border-info">
        <h5 className="card-header bg-info">Exmple four:</h5>
        <div className="card-body">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="card mb-2">
              <div className="card-body">
                <form
                  className="form-inline"
                  onSubmit={e => {
                    e.preventDefault();
                    if (this.timeout) {
                      clearTimeout(this.timeout);
                      this.timeout = null;
                    }
                    let { number1, number2 } = this.state.model;
                    const { action } = this.state;
                    let answer;
                    number1 = parseFloat(number1);
                    number2 = parseFloat(number2);
                    if (!isNaN(number1) && !isNaN(number2)) {
                      switch (action) {
                        case "ADD":
                          answer = number1 + number2;
                          break;
                        case "SUB":
                          answer = number1 - number2;
                          break;
                        case "MUL":
                          answer = number1 * number2;
                          break;
                        case "DIV":
                          if (number2 === 0) {
                            answer = "Infinity";
                          } else {
                            answer = number1 / number2;
                          }
                          break;
                        default:
                      }
                      if (answer) {
                        this.setState(
                          { answer: Math.round(answer) || "almost zero" },
                          () => {
                            this.timeout = setTimeout(() => {
                              this.setState({ answer: null });
                            }, 5000);
                          }
                        );
                      }
                    }
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="number1"
                    name="number1"
                    value={model.number1}
                    onFocus={e =>
                      this.setState({ currentInputElement: e.target })
                    }
                    onChange={e => {
                      this.update("number1", e.target.value);
                    }}
                    placeholder="Enter number"
                  />
                  <select
                    className="form-control mr-3 ml-3"
                    value={model.action}
                    onChange={this.handleChange}
                  >
                    <option value="ADD">ADD</option>
                    <option value="SUB">SUB</option>
                    <option value="MUL">MUL</option>
                    <option value="DIV">DIV</option>
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    id="number2"
                    name="number2"
                    value={model.number2}
                    onFocus={e =>
                      this.setState({ currentInputElement: e.target })
                    }
                    onChange={e => {
                      this.update("number2", e.target.value);
                    }}
                    placeholder="Enter number"
                  />
                  <button type="submit" className="btn btn-success ml-3">
                    Submit
                  </button>
                </form>
                {answer ? (
                  <div className="alert alert-info mt-2 text-center">
                    Answer is: {answer}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center px-2 py-2">
            <div className={window.innerWidth > 600 ? "w-25 p-3" : ""}>
              <ReactVirtualKeyboard
                updateHandler={this.update}
                input={currentInputElement}
                options={{ onlyNumeric: true }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
