var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var distDir = 'lib/';
var srcFiles = 'src/**/*.es6';

/**
 * Default task
* use befor:
* npm install --save-dev babel-plugin-angular2-annotations
* npm install --save-dev babel-plugin-transform-decorators-legacy babel-plugin-transform-class-properties babel-plugin-transform-flow-strip-types babel-preset-es2015
* npm install babel-plugin-transform-es2015-modules-commonjs
 */
gulp.task('default', ['babel']);

/**
 * Babel transpile source
 */
gulp.task('babel', function(){
    return gulp.src(srcFiles)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distDir));
});

gulp.task('babel:watch', function(){
    return gulp.watch(srcFiles, ['babel']);
});
