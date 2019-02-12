import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ReactVirtualKeyboard.css";

class ReactVirtualKeyboard extends Component {
  constructor(props) {
    super(props);
    this.keys = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "back"],
      ["-", "_", "(", ")", "{", "}", "[", "]", "|", ":", '"'],
      ["<", ">", ",", ".", "?", "/", "+", "#", "$", "%", "*"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "back"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", "!", "?", "clear"],
      ["123", "@", "space", ".com", ".", "123"]
    ];
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.state = {
      currentKeys: null,
      shift: false,
      numbers: false,
      isMounted: false,
      inputCaretPosition: 0
    };
  }

  componentDidMount() {
    const keys = JSON.parse(JSON.stringify(this.keys)).slice(3);
    this.setState(
      {
        currentKeys: keys,
        isMounted: true
      },
      () => {
        const options = this.props.options;
        if (options) {
          if (options.alphabet === false && !options.onlyNumeric) {
            this.activateNumbers();
          }
          if (options.onlyNumeric === true) {
            const keys = [
              ["1", "2", "3"],
              ["4", "5", "6"],
              ["7", "8", "9"],
              ["back", "0", "clear"]
            ];
            this.setState({ currentKeys: keys });
          }
        }
      }
    );
  }

  keyClick(key) {
    const k = key && key.trim();
    if (k === "shift") {
      return this.activateShift();
    }
    if (k === "123") {
      return this.activateNumbers();
    }
    return this.updateCaretPosition(() => {
      this.update(k);
    });
  }

  activateShift() {
    this.setState({ shift: !this.state.shift }, () => {
      const { shift } = this.state;
      const newKeys = JSON.parse(JSON.stringify(this.keys)).slice(3);
      const alphabet = this.alphabet.split("");
      newKeys.forEach(arr => {
        arr.forEach((key, index, _arr) => {
          if (key.length === 1 && alphabet.indexOf(key) > -1) {
            _arr[index] = shift ? key.toUpperCase() : key.toLowerCase();
          }
        });
      });
      this.setState({ currentKeys: newKeys });
    });
  }

  activateNumbers() {
    this.setState({ numbers: !this.state.numbers, shift: false }, () => {
      const { numbers } = this.state;
      const newKeys = JSON.parse(JSON.stringify(this.keys));
      numbers ? newKeys.splice(3, 3) : newKeys.splice(0, 3);
      this.setState({ currentKeys: newKeys });
    });
  }

  update(value) {
    let { inputCaretPosition } = this.state;
    const { updateHandler, input } = this.props;
    if (input && updateHandler) {
      const currentModelValue = input.value;
      const currentModel = input["name"];
      if (value === "enter") {
        if (input.nodeName.toLocaleLowerCase() === "textarea") {
          value = "\n";
        } else {
          return;
        }
      }
      if (value === "space") {
        value = " ";
      }
      if (value === "clear") {
        inputCaretPosition = 0;
        return this.setState({ inputCaretPosition }, () => {
          updateHandler(currentModel, "");
        });
      }
      if (currentModelValue) {
        let newValue = "";
        const temp = inputCaretPosition;
        if (
          inputCaretPosition >= 0 &&
          inputCaretPosition <= currentModelValue.length
        ) {
          const pos = inputCaretPosition++;
          if (value === "back") {
            if (temp > 0) {
              newValue =
                currentModelValue.substr(0, pos - 1) +
                currentModelValue.substr(pos);
              inputCaretPosition -= 2;
            } else {
              inputCaretPosition = temp;
            }
          } else {
            newValue =
              currentModelValue.substr(0, pos) +
              value +
              currentModelValue.substr(pos);
            if (value === ".com") {
              inputCaretPosition += 3;
            }
          }
        }
        if (newValue.length) {
          this.setState({ inputCaretPosition }, () => {
            updateHandler(currentModel, newValue);
          });
        } else {
          if (value === "back") {
            if (temp <= 0) {
              return;
            }
            this.setState({ inputCaretPosition }, () => {
              updateHandler(currentModel, "");
            });
          } else {
            this.setState({ inputCaretPosition }, () => {
              updateHandler(currentModel, `${currentModel}${value}`);
            });
          }
        }
      } else {
        if (value === "back") {
          return;
        }
        inputCaretPosition += 1;
        if (value === ".com") {
          inputCaretPosition += 3;
        }
        this.setState({ inputCaretPosition }, () => {
          updateHandler(currentModel, value);
        });
      }
      this.setState({ inputCaretPosition }, () => {
        this.setCaretPosition(input, this.state.inputCaretPosition);
      });
    }
  }

  setCaretPosition(el, caretPos) {
    if (el) {
      if (el.createTextRange) {
        const range = el.createTextRange();
        range.move("character", caretPos);
        range.select();
        return true;
      } else {
        if (el.selectionStart || el.selectionStart === 0) {
          el.focus();
          setTimeout(() => el.setSelectionRange(caretPos, caretPos), 0);
          return true;
        } else {
          el.focus();
          return false;
        }
      }
    }
  }

  updateCaretPosition(cb) {
    const { input } = this.props;
    if (input) {
      const inputCaretPosition = this.getCaretPosition(input);
      this.setState({ inputCaretPosition }, cb);
    }
  }

  getCaretPosition(input) {
    let iCaretPos = 0;
    if (document["selection"]) {
      input.focus();
      const oSel = document["selection"].createRange();
      oSel.moveStart("character", -input.value.length);
      iCaretPos = oSel.text.length;
    } else if (
      input &&
      (input.selectionStart || input.selectionStart === "0")
    ) {
      iCaretPos = input.selectionStart;
    }
    return iCaretPos;
  }

  createKey(key, shift, numbers) {
    switch (key) {
      case "back": {
        return (
          <button className="back-key" title="BACKSPACE">
            &#9003;
          </button>
        );
      }
      case "enter": {
        return (
          <button className="enter-key" title="ENTER">
            &#8629;
          </button>
        );
      }
      case "shift": {
        return (
          <button className={shift ? "shift-activated" : "shift"} title="SHIFT">
            &#8679;
          </button>
        );
      }
      case "space": {
        return (
          <button className="space-key" title="SPACE">
            {key}
          </button>
        );
      }
      case "clear": {
        return (
          <button title="CLEAR" className="clear-key">
            &#10754;
          </button>
        );
      }
      default: {
        return (
          <button>
            {numbers && key === "123"
              ? "ABC"
              : numbers && key === "ABC"
              ? "123"
              : key}
          </button>
        );
      }
    }
  }

  render() {
    const { currentKeys, shift, numbers, isMounted } = this.state;
    if (!isMounted) {
      return null;
    }
    return (
      <div
        className="keyboard-container"
        onMouseDown={e => e.stopPropagation()}
      >
        {currentKeys.map((keys, keysIndex) => {
          const i = ++keysIndex;
          return (
            <ul className={`row-${i}`} key={i}>
              {keys.map((key, keyIndex) => {
                const i = ++keyIndex;
                return (
                  <li
                    key={`${key.toLowerCase()}-${i}`}
                    onMouseDown={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.keyClick(key);
                    }}
                  >
                    {this.createKey(key, shift, numbers)}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  }
}

ReactVirtualKeyboard.propTypes = {
  input: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLInputElement),
    PropTypes.instanceOf(HTMLTextAreaElement)
  ]),
  updateHandler: PropTypes.func.isRequired
};

export default ReactVirtualKeyboard;
