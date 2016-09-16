'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var configify = require('config-browserify');
var replace = require('gulp-replace-task');

// Load plugins
var browserify = require('browserify');
var watchify = require('watchify');

var browserifyConfig = {
	'entries': ['./src/scripts/main.jsx'],
	'extensions': ['.js','.jsx'],
	'transform': ['babelify', configify], //presets in .babelrc
	'debug': true,
	'insertGlobals': true,
	'cache': {},
	'packageCache': {},
	'fullPaths': true
};

// Gulp browserSync task
gulp.task('browserSync', function() {
	browserSync({
		notify: false,
		logPrefix: 'BS',
		server: {
			baseDir: 'build'
		},
		middleware : [ historyApiFallback() ]
	})
});

// Development Tasks
// ------------------------
// CSS
// ------------------------
gulp.task('styles', function() {
	return gulp
		.src('src/styles/main.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			errLogToConsole: true
		}).on('error', $.sass.logError))
		.pipe($.autoprefixer('last 1 version'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('./build/styles'))
});

// JS
// ------------------------
// Watchify/browserify
function rebundle() {
	var bundler = new watchify(new browserify(browserifyConfig));
	bundler.on('update', rebundle);
	bundler.on('log', $.util.log);
	return bundler.bundle()
		// log errors if they happen
		.on('error', $.util.log.bind($.util, 'Browserify Error'))
		.pipe(source('main.jsx'))
		.pipe(gulp.dest('./build/scripts'))
		.on('end', function() {
			gulp.src('src/*.html')
				.pipe($.useref())
				.pipe(gulp.dest('./build'));
			reload();
		});
}

// Scripts task
gulp.task('scripts', rebundle);

// Bower == vendor plugins
// -----------------------
gulp.task('bower', function() {
	gulp.src('bower_components/**/*.js', {
			base: 'bower_components'
		})
		.pipe(gulp.dest('./build/bower_components/'));
});

// HTML
// ------------------------
// HTML with regular assets
gulp.task('html', ['styles'], function() {
	return gulp.src('src/*.html')
		.pipe($.useref())
		.pipe(gulp.dest('./build'));
});

// HTML with minified and uglified assets
gulp.task('useref', function(){
	return gulp.src('src/*.html')
		.pipe($.useref())
		// Minifies only if it's a JavaScript file
		.pipe($.if('*.js', $.uglify()))
		// Minifies only if it's a CSS file
		.pipe($.if('*.css', $.cssnano()))
		.pipe(gulp.dest('./build'))
});

// Clean
// ------------------------
gulp.task('clean', function() {
	$.cache.clearAll();
	return del.sync(['./build/**/*']);
});

// Reloaders
// -----------------------
gulp.task('reloadStyles', function() {
	runSequence(
		['styles'],
		'html',
		reload
	)
});

// Watch
gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.scss', ['reloadStyles']);
	gulp.watch('src/*.html', ['html']);
});


// Build Sequences
// ------------------------

// Developer Task
gulp.task('build:dev', function() {
	runSequence(
		['bower'],
		['styles', 'scripts'],
		['html', 'browserSync', 'watch']
	)
});