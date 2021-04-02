import ReactDOM from 'react-dom';
import React from 'react';
import {App} from "./base/App";

const target = document.createElement('div')
document.body.append(target);
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.title = 'Зайцы-засранцы'
ReactDOM.render(<App />, target);