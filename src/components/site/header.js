'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - HEADER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Layout from '@continuum/react-bulma';
import Logo from '~/src/assets/images/harvest-logo.svg';

/**
 *
 */
export default class Header extends React.Component {

  render() {
    return (
      <Layout.Container classes={`site-header is-fluid ${this.props.classes || ''}`}>
        <Layout.Columns classes='is-centered is-flex-mobile is-flex-tablet is-flex-desktop'>
          <Layout.Column classes='is-centered'>
            <img src={Logo} />
          </Layout.Column>
        </Layout.Columns>
      </Layout.Container>
    )
  }
}
