'use strict';

/**
 *  Watches specific types of assets, or all, based on a CLI parameter.
 *  When any of these source files associated with an asset type changes
 *  this triggers compilation methods.
 *
 *  Example Usage:
 *  gulp watch
 *  gulp watch --watchType styles
 *  gulp watch --watchType styles,html
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    chalk = require('chalk'),
    globalSettings = require('../config');

gulp.task('watch',
    gulp.series(
        gulp.parallel('assets', 'custom-deps', 'html'),
        'styles',
        function watchAll(done) {
            var watchFunctions = {
                html: function() {
                    console.log(chalk.bgYellow.gray(' FE Skeleton: Watching HTML.'));
                    gulp.watch(globalSettings.taskConfiguration.watch.sourcePaths.html, gulp.series('html'));
                },
                styles: function() {
                    console.log(chalk.bgYellow.gray(' FE Skeleton: Watching styles.'));
                    gulp.watch(globalSettings.taskConfiguration.watch.sourcePaths.styles, gulp.series('styles'));
                },
                scripts: function() {
                    console.log(chalk.bgYellow.gray(' FE Skeleton: Watching scripts.'));
                    gulp.task('scripts:watch')();
                }
            };

            // If no arguments were supplied then we start all watches.
            // Else cycle supplied argumentss and build an array of method names.
            var watchMethods = ((!args.watchType)?
                    Object.keys(watchFunctions)
                :   args.watchType.split(',').map(function(currentValue) {
                        return currentValue.trim();
                    }));

            // Cycle through the method names requiring watchers setup and call them.
            watchMethods.forEach(function(methodName) {
                watchFunctions[methodName]();
            });

            done();
        }
    )
);