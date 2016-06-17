module.exports = function (gulp, isRelease) {
    var runSequence = require('run-sequence');

    gulp.task('build-js', function () {
        if (isRelease) {
            runSequence(
                'compile-tsc',
                ['bundle-static', 'bundle-vendor', 'bundle-app'],
                'prepend-info',
                function () { }
            );
        }
        else {
            runSequence(
                'compile-tsc',
                function () { }
            );
        }
    });
}