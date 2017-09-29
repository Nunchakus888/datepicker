'use strict';
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const gutil = require('gulp-util');
const runSequence = require('run-sequence').use(gulp);
const webpack = require('webpack');
const gulpLoadPlugins = require('gulp-load-plugins');
const eslint = require('gulp-eslint');

const plugins = gulpLoadPlugins();
const DIST_PATH = path.join(__dirname, 'dist');
const ENV = process.env.NODE_ENV;

gulp.task('clean', function() {
    return del([
        DIST_PATH + '/**/**'
    ]);
});

gulp.task('webpack', function(cb) {
    webpack(require('./webpack.config'), function(err, stats) {
        gutil.log('[webpack:build]', stats.toString({
            chunks: false,
            colors: true
        }));

        if (err) {
            throw new gutil.PluginError('webpack:build', err, {showStack: true});
        }

        let jsonStats = stats.toJson();

        if (jsonStats.errors.length > 0) {
            throw new gutil.PluginError(
                'webpack:build',
                jsonStats.errors.toString(),
                { showStack: true }
            );
        }
        cb();
    });
});


/**
 * Lint source code
 */
gulp.task('lint', () => (
    gulp.src([
        'src/**/*.js',
        'src/**/**.vue',
    ])
        .pipe(plugins.eslint())
        .pipe(eslint({ configFle: './.eslintrc', quiet: true }))
        .pipe(eslint.format(undefined, process.stderr))
        .pipe(plugins.eslint.failAfterError())
));

gulp.task('default', function() {
    runSequence('clean', 'lint', 'webpack');
});

/**
 * Build
 */
// gulp.task(
//     'build',
//     ['clean', 'lint'],
//     next => runSequence('webpack', next))