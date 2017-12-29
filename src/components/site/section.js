'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - SECTION
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Layout from '@continuum/react-bulma';

/**
 *
 */
export default class Section extends React.Component {

  render() {
    return (
      <Layout.Container classes={`site-section ${this.props.classes}`}>
        {this.props.children}
      </Layout.Container>
    )
  }
}
