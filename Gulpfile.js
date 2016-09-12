'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
var gulp = require('gulp');
var winstall = require('electron-windows-installer');

gulp.task('build.windows', function(done) {
  winstall({
    appDirectory: './releases/succotash-win32-ia32',
    outputDirectory: './installers/win32',
    arch: 'ia32',
    authors: 'Bakuhatsu Consulting LLC',
    exe: 'succotash.exe',
    // setupIcon: './images/harvest-icon.png',
    iconUrl: 'https://blog.agilebits.com/wp-content/uploads/2015/01/Harvest-Icon-1024-Rounded.png'
  }).then(done).catch(done);
})