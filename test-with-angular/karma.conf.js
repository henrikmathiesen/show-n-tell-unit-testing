module.exports = function (config) {

    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            './bld/lib.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './bld/templates.js',
            './bld/app.js',
            './src/**/*.test.js'
        ],
        logLevel: config.LOG_DISABLE,
        singleRun: true,
        autoWatch: false
    });

}
