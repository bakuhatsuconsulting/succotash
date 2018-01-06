'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - PUBLIC - MAIN
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Components from '~/src/components';
import Domains from '~/src/domains';
import Settings from '~/src/system/settings';

/**
 *
 */
export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {projects: {}};

    /**
     * [subscriptions description]
     * @type {Object}
     */
    this.subscriptions = {
      'Projects.Remote': Domains.Projects.Remote.subscribe(this.setRemoteProjects.bind(this))
    };

    /**
     * [settings description]
     * @type {Object}
     */
    this.settings = {
      remote: {
        headers:{'Authorization': `Bearer ${Settings.get('token')}`, 'Harvest-Account-Id': Settings.get('account_id')}
      }
    };

    console.log(this)
  }

  componentWillMount() {
    Domains.Projects.Remote.get(this.settings.remote);
  }

  setRemoteProjects(projects) {
    this.state.projects.remote = projects;
    this.setState(this.state);
  }

  render() {
    return (
      <Components.Site.Body>
        <Components.Site.Header />
        <Components.Site.Section centered classes="is-fluid is-centered projects">
          <Components.Layout.Columns classes="is-centered is-multiline">
            <Components.Layout.Column width={10}>
              <Domains.Projects.Local.Components.Add projects={this.state.projects.remote}/>
            </Components.Layout.Column>
            <Components.Layout.Column width={10}>
              <hr />
            </Components.Layout.Column>
            <Components.Layout.Column width={10}>
              projects list
            </Components.Layout.Column>
          </Components.Layout.Columns>
        </Components.Site.Section>
      </Components.Site.Body>
    )
  }
}
