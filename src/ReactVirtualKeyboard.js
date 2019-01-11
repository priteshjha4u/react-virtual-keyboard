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
      ["shift", "z", "x", "c", "v", "b", "n", "m", "!", "?", "shift"],
      ["123", "@", "space", ".com", ".", "123"]
    ];
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.state = {
      currentKeys: null,
      shift: false,
      numbers: false
    };
  }

  componentDidMount() {
    const keys = JSON.parse(JSON.stringify(this.keys)).slice(3);
    this.setState({ currentKeys: keys });
  }

  keyClick(key) {
    console.log(key);
  }

  createKey(key, shift) {
    switch (key) {
      case "back": {
        return (
          <a href="javascript:;" className="back-key">
            &#9003;
          </a>
        );
      }
      case "enter": {
        return (
          <a href="javascript:;" className="enter-key">
            &#8629;
          </a>
        );
      }
      case "shift": {
        return (
          <a href="javascript:;" className={shift ? "shift" : ""}>
            &#8679;
          </a>
        );
      }
      case "space": {
        return (
          <a href="javascript:;" className="space-key">
            &#32;
          </a>
        );
      }
      default: {
        return (
          <a href="javascript:;" className="fnKey">
            {key}
          </a>
        );
      }
    }
  }

  render() {
    const { currentKeys, shift, numbers } = this.state;
    return (
      <div className="keyboard-container">
        {currentKeys.map((keys, keysIndex) => {
          return (
            <ul className={`row-${keysIndex}`}>
              {keys.map(key => {
                return (
                  <li className={shift ? "uppercase" : ""} onClick={()=>this.keyClick(key)}>
                    {this.createKey(key, shift)}
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
