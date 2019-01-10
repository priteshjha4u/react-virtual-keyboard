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
      ["123?", "@", "space", ".com", ".", "123?"]
    ];
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.state = {
      currentKeys: null,
      shift: false,
      numbers: false
    };
  }

  render() {
    return (
      <div className="keyboard_container">
       
      </div>
    );
  }
}

export default ReactVirtualKeyboard;
