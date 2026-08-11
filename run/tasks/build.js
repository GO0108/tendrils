'use strict';

/**
 *  Builds all necessary front-end static files. This method is primarily used
 *  during deployment.
 *
 *  Example Usage:
 *  gulp build
 */

var gulp = require('gulp');

// 'styles' imports partials written by 'custom-deps' (e.g. libs/build/_reset.scss),
// so it must run after 'custom-deps' completes rather than in parallel with it.
gulp.task('build', gulp.series(
    gulp.parallel('html', 'assets', 'custom-deps'),
    gulp.parallel('styles', 'scripts')
));
