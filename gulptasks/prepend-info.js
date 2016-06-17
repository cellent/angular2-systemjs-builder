module.exports = function (gulp, isRelease, config) {
    var insert = require('gulp-insert');

    gulp.task('prepend-info', function () {
        var prepend = '/* Project Informations' + ' \n' +
            '* Name: ' + config.name + ' \n' +
            '* Description: ' + config.description + ' \n' +
            '* Version: ' + config.version + ' \n' +
            '* License: ' + config.license + ' \n' +
            '*/ \n';
        return gulp.src('www/build/**/*.js').pipe(insert.prepend(prepend))
            .pipe(gulp.dest('www/build/'));
    });
}