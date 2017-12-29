'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - SYSTEM - VIEW
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from '@continuum/continuum';
import React from 'react';
import Dom from 'react-dom';

/**
 *
 */
export default class View extends Continuum.View {
  constructor(route, component, spec) {
    super(route, spec);

    this.component = component || Stub;
  }

  render(params) {
    this.instance = Dom.render(<this.component params={params} />, document.getElementById('content'));
  }
}

class Stub extends React.Component {
  render() {
    return <p>Empty Component given to System.View</p>
  }
}
