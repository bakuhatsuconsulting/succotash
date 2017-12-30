'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - PUBLIC - LOGIN
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Components from '~/src/components';
import Authentication from '~/src/system/authentication';
import Identity from '~/src/system/identity';
import Harvest from '~/src/system/harvest';

/**
 *
 */
export default class Login extends React.Component {
  constructor() {
      super();

      this.state = {};
  }

  login(e) {
    e.preventDefault();
    console.log(this.state)
    Authentication.login(this.state)
      .then(response => console.log(response))
      .catch(err => console.log(err))

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
                <label className="label" htmlFor="subdomain">Harvest Domain:</label>
                <input type="text" className="input" id="subdomain" defaultValue={this.state.domain}  placeholder="<domain>.harvestapp.com" name="domain" onChange={this.update.bind(this, 'domain')} />
              </div>
              <div className="control margin-top__med">
                <label className="label" htmlFor="identifier">Email:</label>
                <input type="text" className="input" id="identifier" defaultValue={this.state.email}  placeholder="Harvest Email" name="email" onChange={this.update.bind(this, 'email')} />
              </div>
              <div className="control margin-top__med">
                <label className="label" htmlFor="secret">Password</label>
                <input type="password" className="input" id="secret" defaultValue={this.state.password} placeholder="You may need to create a password in your account settings if you typically log in with Google, etc." name="password" onChange={this.update.bind(this, 'password')} />
              </div>
              <div className="right control margin-top__large">
                <button onClick={this.login.bind(this)} className="button is-success" disabled={!this.state.domain || !this.state.email || !this.state.password}>Log In</button>
              </div>
            </form>
            </Components.Layout.Column>
          </Components.Layout.Columns>
        </Components.Site.Section>
      </Components.Site.Body>
    )
  }
}
