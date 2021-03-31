import ReactDOM from 'react-dom';
import React from 'react';
import {App} from "./App";

let target = document.createElement('div')
document.body.append(target);
document.body.style.margin = '0';
document.body.style.overflow = 'hidden'
ReactDOM.render(<App />, target);