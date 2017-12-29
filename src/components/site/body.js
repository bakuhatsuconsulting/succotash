'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - HEADER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Layout from '@continuum/react-bulma';

/**
 *
 */
export default class Body extends React.Component {

  render() {
    return (
      <Layout.Container classes={`site-body ${this.props.classes || ''}`}>
        {this.props.children}
      </Layout.Container>
    )
  }
}
