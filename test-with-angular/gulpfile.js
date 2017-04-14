var gulp = require('gulp');
var connect = require('gulp-connect');

var config = {
    src: {
        html: './index.html',
        app: ['./src/**/*.module.js', './src/**/*.js']
    },
    bld: './bld',
    server: {
        port: 1337
    }
};

gulp.task('html', function () {
    return gulp.src(config.src.html)
        .pipe(gulp.dest(config.bld))
});

gulp.task('connect', function () {
    connect.server({
        root: config.bld,
        port: config.server.port
    })
});
