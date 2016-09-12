'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import electron from 'electron'
import React from 'react';
import Settings from 'app/system/settings';

/**
 * 
 */
Settings.init()
  .then(function(settings) {
    return require('app/index.jsx');;
  }).then(function(Succotash) {
    React.render(<Succotash />, document.getElementById('content'));
  });