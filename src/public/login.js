'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - PUBLIC - LOGIN
 ***********************************************************************************************************************************************
 * @description
 */

/*eslint camelcase: ["error", {properties: "never"}]*/

import React from 'react';
import Components from '~/src/components';
import Authentication from '~/src/system/authentication';
import Identity from '~/src/system/identity';
import Settings from '~/src/system/settings';
import Router from '~/src/system/router';

/**
 *
 */
export default class Login extends React.Component {
  constructor() {
      super();

      this.state = {
        account_id: process.env.ACCOUNT_ID || Settings.get('account_id') || '',
        token: process.env.ACCESS_TOKEN || Settings.get('token') || ''
      };

  }

  login(e) {
    e.preventDefault();

    Authentication.login(this.state)
      .then(response => Identity.set(response.data))
      .then(() => Settings.set({'token': this.state.token}))
      .then(() => Settings.set({'account_id': this.state.account_id}))
      .then(() => window.location.href = '#/')
      .catch(err => {
        console.log(err)
        this.setState({'error': err});
      });
  }

  update(field, e) {
    e.persist();
    this.state[field] = e.target.value;
    this.setState(this.state);
  }

  render() {
    return (
      <Components.Site.Body>
        <Components.Site.Header />
        <Components.Site.Section centered classes="is-fluid is-centered absolute-center">
          <Components.Layout.Columns classes="is-centered">
            <Components.Layout.Column width='1/2'>
            <form className="form" onSubmit={this.login.bind(this)}>
              <div className="control">
                <label className="label" htmlFor="account_id">Harvest Account Id: <a href="https://help.getharvest.com/api-v2/authentication-api/authentication/authentication" target="_blank">(?)</a></label>
                <input type="text" className="input" id="token" defaultValue={this.state.account_id}  placeholder="Your Harvest Account Id" name="account_id" onChange={this.update.bind(this, 'account_id')} />
              </div>
              <div className="control">
                <label className="label" htmlFor="token">Harvest Token: <a href="https://help.getharvest.com/api-v2/authentication-api/authentication/authentication" target="_blank">(?)</a></label>
                <input type="text" className="input" id="token" defaultValue={this.state.token}  placeholder="Your Harvest Access Token" name="token" onChange={this.update.bind(this, 'token')} />
              </div>
              <div className="right control margin-top__large">
                <button onClick={this.login.bind(this)} className="button is-success" disabled={!this.state.token || !this.state.account_id}>Start Tracking!</button>
                {
                  this.state.error? <span>Error interacting with harvest.</span> : <span>&nbsp;</span>
                }
              </div>
            </form>
            </Components.Layout.Column>
          </Components.Layout.Columns>
        </Components.Site.Section>
      </Components.Site.Body>
    )
  }
}
