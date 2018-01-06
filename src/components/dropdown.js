'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - COMPONENTS - DROPDOWN
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

export default class Dropdown extends React.Component {
    render() {
      return (
        <select name={this.props.name} className={`input ${this.props.classes || ''}`}>
          {(this.props.data || []).map(option => {
            return (
              <option value={option[this.props.value]}>{option[this.props.label]}</option>
            )
          })}
        </select>
      )
    }
}
