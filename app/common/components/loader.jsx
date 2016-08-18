'use strict';

/***********************************************************************************************************************************************
 * Loader
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

export default class Loader extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="absolute-center">
        <img src="images/facebook.gif" />
      </div>
    )
  }
}