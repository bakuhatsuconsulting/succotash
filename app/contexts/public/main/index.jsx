'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import React from 'react';
import Loader from '../../../common/components/loader.jsx';
import Settings from '../../../system/settings';
import * as Security from '../../../system/security';
import * as Identity from '../../../system/identity';
import Auth from '../../../system/auth';
import Events from 'pubsub-js';
import Private from '../../private';

/**
 * 
 */
export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {settings: Security.decrypt(Settings.get('user') || '') || {}, basic: true, initialized: false};
  }

  componentWillMount() {
    let settings = this.state.settings;

    if(settings.domain && settings.email && settings.password) {
      return this.login();
    } else {
      this.setState({initialized: true});
    }
  }

  update(e) {
    e.persist();

    this.state.settings[e.target.name] = e.target.value;
  }

  login() {
    this.setState({initialized: false});
    
    new Auth(this.state.settings).login()
      .then(Identity.set)
      .then(this.save(this.state.settings))
      .then(this.success)
      .catch(this.error)
      .done();
  }

  success(data) {
    Events.publish('content', <Private.Main />);
  }

  error(err) {
    this.setState({error: error});
  }

  save(settings) {
    return function() {
      return Settings.set({user: Security.encrypt(settings)});
    }
  }

  render() {
    let self = this;
    let dom =  (
      <div className="row content">
        <Loader />
      </div>);

    if(this.state.initialized) {
      dom = (
        <div className="col-xs-12 content-main">
          <header className="">
            <h4>Log into Harvest</h4>
          </header>
          <div className="col-xs-12">
              {(function() {
                if(self.state.basic) {
                  return (
                    <form className="form">
                      <div className="form-row">
                        <label className="" for="subdomain">Harvest Domain:</label>
                        <input type="text" className="form-control" id="subdomain" defaultValue={self.state.settings.domain}  placeholder="foo.harvestapp.com" name="domain" onChange={self.update.bind(self)} />
                      </div>
                      <div className="form-row">
                        <label className="" for="identifier">Email:</label>
                        <input type="text" className="form-control" id="identifier" defaultValue={self.state.settings.email}  placeholder="Harvest Email" name="email" onChange={self.update.bind(self)} />
                      </div>
                      <div className="form-row">
                        <label className="" for="secret">Password</label>
                        <input type="password" className="form-control" id="secret" defaultValue={self.state.settings.password} placeholder="Password" name="password" onChange={self.update.bind(self)} />
                      </div>  
                    </form>
                  )
                }

                return (
                  <form className="form">
                    <div className="form-row">
                      <label className="" for="subdomain">Harvest Domain:</label>
                      <input type="text" className="form-control" id="subdomain" defaultValue={self.state.settings.domain}  placeholder="foo.harvestapp.com" name="domain" onChange={self.update.bind(self)} />
                    </div>
                    <div className="form-row">
                      <label className="" for="identifier">Harvest Client ID:</label>
                      <input type="text" className="form-control" id="identifier" defaultValue={self.state.settings.client}  placeholder="Client ID from oAuth registration" name="identifier" onChange={self.update.bind(self)} />
                    </div>
                    <div className="form-row">
                      <label className="" for="secret">Harvest Client Secret:</label>
                      <input type="password" className="form-control" id="secret" defaultValue={self.state.settings.secret} placeholder="Client secret from oAuth registration" name="secret" onChange={self.update.bind(self)} />
                    </div>
                  </form>
                )
              })()}
            <div className="center">
              <div>
                <button onClick={this.login.bind(this)} className="btn btn-default">Log In</button>
              </div>
              <div className="margin-top__large">
                <a onClick={function() {self.setState({basic: !self.state.basic})}}>{!this.state.basic? 'Login with username and password.' : 'Log In with oAuth'}</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    return dom;
  }
}