'use strict';

/***********************************************************************************************************************************************
 * Loader
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

export default class Loader extends React.Component {
  constructor(props) {
    super();
    
    props = props || {};
    this.state = {type: props && props.type || 'normal', width: props.width || 'auto', height: props.height || 'auto'};
  }

  render() {
    let dom = (
      <div className="absolute-center">
        <img src="images/facebook.gif" width={this.state.width} height={this.state.height} />
      </div>
    )

    if(this.state.type === 'small') {
      dom = (
        <div className="absolute-center">
          <img src="images/facebook-black-small.gif" width={this.state.width} height={this.state.height} />
        </div>
      )      
    }

    return dom;
  }
}