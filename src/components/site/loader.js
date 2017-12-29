'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - LOADER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Large from '~/src/assets/images/facebook.gif'
import Small from '~/src/assets/images/facebook-black-small.gif'

const sizes = {
  large: Large,
  small: Small
};

/**
 * [show description]
 * @type {[type]}
 */
export default class Loader extends React.Component {
  render() {
    let style = {display: (this.props.show? 'block' : 'none')}

    return (
      <div className="absolute-center" style={style}>
        <img src={sizes[this.props.size] || Large} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}
