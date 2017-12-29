'use strict';

/***********************************************************************************************************************************************
 * Succotash
 ***********************************************************************************************************************************************
 * @description
 */

import electron from 'electron'
import React from 'react';
import Headers from './common/components/layout/headers';
import Content from './common/components/layout/content';
import Contexts from './contexts';
import Events from 'pubsub-js';
import Loader from './common/components/loader';
import Watch from './system/watch';

console.log('wat')
/**
 * Succotash App.
 * @type {Object}
 */
export default class Succotash extends React.Component {
  constructor() {
    super();

    this.state = {header: undefined, content: <Loader/>, rendering: false};

    // Set render events.
    Events.subscribe('content', RenderContent.bind(this));
    Events.subscribe('header', RenderHeader.bind(this));

    // Build Application Menu
    electron.remote.Menu.setApplicationMenu(electron.remote.Menu.buildFromTemplate([]));

    window.onbeforeunload = function(e) {
      Watch.clear();
    }

    console.log(this)
  }

  componentWillMount() {
    let Main = Contexts.Public().Main;

    Events.publish('content', <Main />)
  }

  render() {

    let dom =  (
      <div className="row content">
        <Headers name={this.state.header}/>
        <Content>
          {
            this.state.content
          }
        </Content>
      </div>
    )

    if(this.state.rendering) {
      dom = (
        <div className="row content">
          <Loader />
        </div>);
    }

    return dom;
  }
}

function RenderHeader(msg, data) {
  this.setState({header: data});
}

function RenderContent(msg, data) {
  var self = this;

  this.setState({rendering: true}, function() {
    self.setState({content: data, rendering: false});
  });
}
