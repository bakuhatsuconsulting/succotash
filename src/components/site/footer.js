'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - FOOTER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Layout from '@continuum/react-bulma';

/**
 *
 */
export default class Footer extends React.Component {

  render() {
    return (
      <Layout.Container classes={`site-footer ${this.props.classes}`}>
        {this.props.children}
      </Layout.Container>
    )
  }
}
