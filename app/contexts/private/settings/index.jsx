'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Electron from 'electron';
import Dropdown from '../../../common/components/dropdown.jsx';
import settings from '../../../system/settings';

export default class Settings extends React.Component {
  constructor() {
    super();

    this.state = {settings: {expiry: settings.get('expiry') || {value: 10, units: 'minutes'}}};
    this.expiration = {units: [{value: 'minutes'}, {value: 'hours'}, {value: 'days'}]};
  }

  updateExipration(e) {
    e.persist();

    this.state.settings.expiry[e.target.name] = e.target.value;
    this.setState({changed: true, expiry: this.state.settings.expiry});
  }

  save() {
    var self = this;

    settings.set(this.state.settings)
      .then(function() {
        self.setState({changed: false});
      });
  }

  render() {
    var self = this;

    return (

      <div className="col-xs-12 projects">
        <div className="col-xs-12 projects-header gutterless">
          <div className="col-xs-9 gutterless">
            <h3>Settings</h3>
          </div>
          <div className="col-xs-3 right gutterless">
            <button className="btn btn-default" disabled={!this.state.changed} onClick={this.save.bind(this)}>Save Settings</button>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="margin-top__large">
            <span className="col-xs-3 margin-top__small right">Turn off my timer after: </span>
            <span className="col-xs-3">
              <input type="text" className="form-control" onChange={this.updateExipration.bind(this)} defaultValue={this.state.settings.expiry.value} name="value" />
            </span>
            <span className="col-xs-3">
              <Dropdown options={this.expiration.units} selected={{value: this.state.settings.expiry.units}} className="form-control" display='value' value='value' onSelect={this.updateExipration.bind(this)} name='units' />
            </span>
          </div>
        </div>
      </div>
    )

  }
}