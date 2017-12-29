'use strict';

/***********************************************************************************************************************************************
 *
 ***********************************************************************************************************************************************
 * @description
 */
import electron from 'electron'
import React from 'react';
import Dom from 'react-dom';
import Settings from '~/app/system/settings';
// import Succotash from '~/app';
import '~/main.css';

/**
 * Init App
 */
Settings.init()
  .then(settings => {
    console.log('settings', settings)
  });
