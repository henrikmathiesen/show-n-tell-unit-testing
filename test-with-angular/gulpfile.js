var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concatJs = require('gulp-concat');
var connect = require('gulp-connect');


var config = {
    src: {
        html: './index.html',
        app: ['./src/**/*.module.js', './src/**/*.js'],
        templates: './src/**/*.template.html',
        lib: [ './node_modules/angular/angular.js', ]
    },
    bld: './bld',
    server: {
        port: 1337
    }
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

gulp.task('js-app', function(){
    return gulp
            .src(config.src.app)
            .pipe(concatJs('app.js'))
            .pipe(gulp.dest(config.bld));
});

gulp.task('js-lib', function(){
    return gulp
            .src(config.src.lib)
            .pipe(concatJs('lib.js'))
            .pipe(gulp.dest(config.bld));
});

gulp.task('connect', function () {
    connect.server({
        root: config.bld,
        port: config.server.port
    });
});
