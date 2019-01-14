import React, { Component } from "react";
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
      input: null,
      inputCaretPosition: 0,
      _input: ""
    };
  }

  componentDidMount() {
    const keys = JSON.parse(JSON.stringify(this.keys)).slice(3);
    this.setState(
      {
        currentKeys: keys,
        isMounted: true,
        input: this.props.input
      },
      () => {
        const { input } = this.state;
        if (input) {
          this.setBlur();
        }
        document.addEventListener("click", this.documentClick);
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

  componentWillUnmount() {
    const { input } = this.state;
    if (input) {
      input.removeEventListener("blur", this.inputBlur);
    }
    document.removeEventListener("click", this.documentClick);
  }

  componentWillReceiveProps(newProps) {
    const currentInput = this.props.input;
    const newInput = newProps.input;
    if (!currentInput && newInput) {
      return this.setState({ input: newInput }, () => {
        this.setBlur();
      });
    }
    if (
      currentInput &&
      newInput &&
      newInput.name &&
      currentInput.name &&
      currentInput.name !== newInput.name
    ) {
      this.setState({ input: newInput }, () => {
        this.setBlur();
      });
    }
  }

  setBlur() {
    const { input } = this.state;
    if (input) {
      input.addEventListener("blur", this.inputBlur);
    }
  }

  inputBlur = () => {
    return this.updateCaretPosition();
  };

  keyClick(k) {
    const key = k && k.trim();
    if (key === "shift") {
      return this.activateShift();
    }
    if (key === "123") {
      return this.activateNumbers();
    }
    return this.updateInput(key);
  }

  activateShift() {
    this.setState({ shift: !this.state.shift }, () => {
      const { shift, input } = this.state;
      const newKeys = JSON.parse(JSON.stringify(this.keys)).slice(3);
      const alphabet = this.alphabet.split("");
      newKeys.forEach(arr => {
        arr.forEach((key, index, _arr) => {
          if (key.length === 1 && alphabet.indexOf(key) > -1) {
            _arr[index] = shift ? key.toUpperCase() : key.toLowerCase();
          }
        });
      });
      this.setState({ currentKeys: newKeys }, () => {
        // this.setCaretPosition(input, inputCaretPosition);
        if (input) {
          input.focus();
        }
      });
    });
  }

  activateNumbers() {
    this.setState({ numbers: !this.state.numbers, shift: false }, () => {
      const { numbers, input } = this.state;
      const newKeys = JSON.parse(JSON.stringify(this.keys));
      numbers ? newKeys.splice(3, 3) : newKeys.splice(0, 3);
      this.setState({ currentKeys: newKeys }, () => {
        if (input) {
          input.focus();
        }
      });
    });
  }

  updateInput(value) {
    const { input } = this.state;
    let { inputCaretPosition } = this.state;
    const { updateHandler } = this.props;
    if (input && updateHandler && typeof updateHandler === "function") {
      const currentModelValue = input.value;
      const currentModel = input["name"];
      if (value === "enter") {
        if (input.nodeName.toLocaleLowerCase() === "textarea") {
          value = "\n";
        } else {
          this.setCaretPosition(input, inputCaretPosition);
          return;
        }
      }
      if (value === "space") {
        value = " ";
      }
      if (value === "clear") {
        inputCaretPosition = 0;
        return this.setState({ inputCaretPosition }, () => {
          const { input } = this.state;
          if (input) {
            input.focus();
          }
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
              input.focus();
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
          input.focus();
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

  updateCaretPosition() {
    const { input } = this.state;
    if (input) {
      const inputCaretPosition = this.getCaretPosition(input);
      this.setState({ inputCaretPosition });
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

  documentClick = event => {
    setTimeout(() => {
      let keyboard = false;
      const { input, _input } = this.state;
      if (event["path"] && event["path"].length) {
        event["path"].some(el => {
          if (
            el.className &&
            el.className.length &&
            el.className.indexOf("keyboard-container") >= 0
          ) {
            keyboard = true;
            return true;
          }
          return false;
        });
      }
      if (keyboard) {
        return false;
      }
      if (
        event["path"] &&
        event["path"][0] &&
        (event["path"][0].nodeName.toLowerCase() === "input" ||
          event["path"][0].nodeName.toLowerCase() === "textarea")
      ) {
        if (!input && _input) {
          const inputEl = document.getElementsByName(_input);
          if (inputEl.length) {
            this.setState({ input: inputEl[0] });
          }
        }
        return false;
      }
      if (input) {
        this.setState({ _input: input["name"] });
      }
      this.setState({ input: null });
    }, 0);
  };

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
          <button className={shift ? "shift" : ""} title="SHIFT">
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
        return <button title="CLEAR">&#10754;</button>;
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
      <div className="keyboard-container">
        {currentKeys.map((keys, keysIndex) => {
          const i = ++keysIndex;
          return (
            <ul className={`row-${i}`} key={i}>
              {keys.map((key, keyIndex) => {
                const i = ++keyIndex;
                return (
                  <li
                    key={`${key.toLowerCase()}-${i}`}
                    onClick={() => this.keyClick(key)}
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

export default ReactVirtualKeyboard;
