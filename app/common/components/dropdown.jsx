'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';

/**
 * 
 */
export default class Dropdown extends React.Component {
  constructor(props) {
    super();
    
    this.props = props || {};
    this.state = {selected: undefined};
  }

  select(e) {
    e.persist();
    this.setState({selected: e.target.value}, function() {
      (this.props.onSelect || function() {})(e);
    });
  }

  componentWillMount() {
    if(this.props.selected) {
      this.state.selected = this.getSelected();
    }
  }

  getSelected() {
    let self = this;

    var matched = this.props.options.filter(function(option) {
      return Object.keys(self.props.selected || {})
        .filter(function(prop) {
          return self.props.selected[prop] === option[prop];
        }).length === Object.keys(self.props.selected).length;
    })[0];

    return matched && matched[this.props.value];
  }

  render() {
    var self = this;
    var dom = (<select className="form-control"></select>);

    try {
      
      var rows = this.props.options.map(function(option, idx) {
        return <Option {...self.props} data={option} key={idx + 1} />
      });

      if(this.props.initEmpty) {
        rows.unshift(<Option {...this.props} key={0} data={{name: ""}} />);
      }

      dom = ( <select ref="dd" className="form-control" name={this.props.name || 'SYP-dropdown-'+Date.now()} onChange={this.select.bind(this)}>{rows}</select>);

      if(this.props.selected && this.state.selected) {
        dom = ( <select ref="dd" value={this.state.selected} className="form-control" name={this.props.name || 'SYP-dropdown-'+Date.now()} onChange={this.select.bind(this)}>{rows}</select>);
      }

    } catch(err) {
      console.error(err);
    }

    return dom;
  }
}

class Option extends React.Component {
  constructor(props) {
    super();

    this.props = props;
  }

  render() {
    return (<option value={this.props.data[this.props.value]}>{this.props.data[this.props.display]}</option>);
  }
}