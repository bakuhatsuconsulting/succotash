'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */

import electron from 'electron'
import React from 'react';
import Headers from './common/components/layout/headers/index.jsx';
import Content from './common/components/layout/content/index.jsx';
import Contexts from './contexts';
import Events from 'pubsub-js';
import Loader from './common/components/loader.jsx';
import Watch from './system/watch';


export default class Succotash extends React.Component {
  constructor() {
    super();
    
    this.state = {header: undefined, content: <Loader/>, rendering: false};
    Events.subscribe('content', RenderContent.bind(this));
    Events.subscribe('header', RenderHeader.bind(this));
    
    electron.remote.Menu.setApplicationMenu(electron.remote.Menu.buildFromTemplate([]));

    window.onbeforeunload = function(e) {
      Watch.clear();
    }
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