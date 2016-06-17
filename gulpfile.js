(function (isRelease) {
    var gulp = require('gulp');
    var gulpWatch = require('gulp-watch');
    var del = require('del');
    var runSequence = require('run-sequence');
    var packageConfig = require('./package.json');

    // Require tasks in 'gulptasks' folder
    ['systemjs-build', 'static-bundle', 'compile-tsc', 'app-bundle', 'build-js', 'prepend-info', 'inject-index']
        .forEach(function (task) {
            require('./gulptasks/' + task + '.js')(gulp, isRelease, packageConfig);
        });
    gulp.task('clean', function () {
        return del(['www/build', 'app/dist', 'app/**/*.js', 'app/**/*.js.map', 'index.html', 'www/index.html']);
    });

    // Watch task
    gulp.task('watch', ['clean'], function (done) {
        runSequence(
            ['build-js'],
            'inject-index',
            function () {
                gulpWatch(['app/**/*.html', 'app/**/*.ts'], function () {
                    gulp.start('build-js')
                });
                done();
            }
        );
    });

    // Build task
    gulp.task('build', ['clean'], function (done) {
        runSequence(
            ['build-js'],
            'inject-index',
            function () { done(); }
        );
    });
})(
    /* Use the following args for handle the gulp build:
     * --release for passing the isRelease paramter
     * --l or --livereload for passing the livereload parameter
     */
    process.argv.indexOf('--release') > -1,
    process.argv.indexOf('-l') > -1 || process.argv.indexOf('--livereload') > -1
    );