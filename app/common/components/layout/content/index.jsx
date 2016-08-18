'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

export default class Content extends React.Component {
  constructor(props) {
    super();
    console.log(props)
    this.state = {content: props.children};
  }

  render() {
    return (
      <div className="col-xs-12 content">
        {this.state.content}
      </div>
    )
  }
}