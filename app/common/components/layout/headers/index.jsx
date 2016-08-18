'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
console.log(React)

/**
 * 
 */
export default class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {header: './templates/'+(props.name || 'default')+'.jsx'};
  }

  render() {
    let dom;

    try {
      dom = require(this.state.header)(this);
    } catch(e) {
      dom = require('./templates/default.jsx')(this);
    }

    return dom;
  }
}