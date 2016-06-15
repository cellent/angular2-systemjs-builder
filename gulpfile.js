(function (isRelease, shouldWatch) {
    var gulp = require('gulp');
    var gulpWatch = require('gulp-watch');
    var del = require('del');
    var runSequence = require('run-sequence');

    // Require tasks in 'gulptasks' folder
    ['systemjs-build', 'static-bundle', 'compile-tsc', 'app-bundle', 'build-js']
        .forEach(function (task) {
            require('./gulptasks/' + task + '.js')(gulp, isRelease);
        });
    gulp.task('clean', function () {
        return del(['www/build', 'app/dist', 'app/**/*.js', 'app/**/*.js.map']);
    });

    // Watch task
    gulp.task('watch', ['clean'], function (done) {
        var jsTask = 'build-dev-js';
        if (isRelease)
            jsTask = 'build-js';
        runSequence(
            [jsTask],
            function () {
                gulpWatch('app/**/*.scss', function () {
                    gulp.start('sass');
                });
                gulpWatch(['app/**/*.html', 'app/**/*.ts'], function () {
                    gulp.start(jsTask)
                });
                done();
            }
        );
    });

    // Build task
    gulp.task('build', ['clean'], function (done) {
        var jsTask = 'build-dev-js';
        if (isRelease)
            jsTask = 'build-js';
        runSequence(
            [jsTask],
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