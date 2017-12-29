'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE
 ***********************************************************************************************************************************************
 * @description This bucket is primarly used for components classified like 'site header', or 'site footer', etc.
 */
import Header from './header';
import Footer from './footer';
import Body from './body';
import Section from './section';
import Loader from './loader';

/**
 * Named Exports
 */
export {Header};
export {Body};
export {Section};
export {Loader};
export {Footer};

/**
 * Default Export
 */
export default {Header, Body, Loader, Section, Footer};
