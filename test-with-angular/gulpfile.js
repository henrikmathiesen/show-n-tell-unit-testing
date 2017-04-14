var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concatJs = require('gulp-concat');
var connect = require('gulp-connect');
var Server = require('karma').Server;


var config = {
    src: {
        html: './index.html',
        app: ['./src/**/*.module.js', './src/**/*.js'],
        templates: './src/**/*.template.html',
        lib: ['./node_modules/angular/angular.js']
    },
    bld: './bld',
    server: {
        port: 1337
    },
    karma: __dirname + '/karma.conf.js'
};

gulp.task('html', function () {
    return gulp.src(config.src.html)
        .pipe(gulp.dest(config.bld));
});

gulp.task('template-cache', function () {
    return gulp
        .src(config.src.templates)
        .pipe(templateCache('templates.js', { module: 'templatecache', standalone: true }))
        .pipe(gulp.dest(config.bld));
});

gulp.task('js-app', function () {
    return gulp
        .src(config.src.app)
        .pipe(concatJs('app.js'))
        .pipe(gulp.dest(config.bld));
});

gulp.task('js-lib', function () {
    return gulp
        .src(config.src.lib)
        .pipe(concatJs('lib.js'))
        .pipe(gulp.dest(config.bld));
});

gulp.task('default', ['js-lib', 'js-app', 'template-cache', 'html'], function () { });

gulp.task('start', ['default'], function () {
    connect.server({
        root: config.bld,
        port: config.server.port
    });
});

gulp.task('test', ['default'], function (done) {
    new Server({
        configFile: config.karma
    }, done).start();
});
