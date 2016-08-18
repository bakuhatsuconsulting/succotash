'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Loader from '../../common/components/loader.jsx';
import Settings from '../../system/settings';
import API from '../../system/api';

/**
 * 
 */
export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {settings: Settings.get()};
  }

  update(e) {
    e.persist();

    this.state.settings[e.target.name] = e.target.value;
  }

  login() {
    let client = API.authenticate(this.state.settings);

    console.log(client)
  }

  render() {
    return (
      <div className="col-xs-12 content-main">
        <header className="">
          <h4>Log into Harvest</h4>
        </header>
        <div className="col-xs-12">
          <form className="form">
            <div className="form-row">
              <label className="" for="subdomain">Harvest Domain:</label>
              <input type="text" className="form-control" id="subdomain" defaultValue={this.state.settings.domain}  placeholder="foo.harvestapp.com" name="subdomain" onChange={this.update.bind(this)} />
            </div>
            <div className="form-row">
              <label className="" for="identifier">Harvest Client ID:</label>
              <input type="text" className="form-control" id="identifier" defaultValue={this.state.settings.client}  placeholder="Client ID from oAuth registration" name="identifier" onChange={this.update.bind(this)} />
            </div>
            <div className="form-row">
              <label className="" for="secret">Harvest Client Secret:</label>
              <input type="password" className="form-control" id="secret" defaultValue={this.state.settings.secret} placeholder="Client secret from oAuth registration" name="secret" onChange={this.update.bind(this)} />
            </div>
          </form>
          <div className="center">
            <button onClick={this.login.bind(this)} className="btn btn-default">Log In</button>
          </div>
        </div>
      </div>
    )
  }
}