module.exports = function (gulp) {
    var typescript = require('gulp-typescript');
    var inlineNg2Template = require('gulp-inline-ng2-template');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var tsProject = typescript.createProject('./tsconfig.json');

    gulp.task('compile-tsc', function () {
        return tsProject.src()
            // .pipe(sourcemaps.init())
            .pipe(typescript(tsProject))
            .pipe(inlineNg2Template({
                base: '/',
                target: 'es5',
                useRelativePaths: true,
                removeLineBreaks: true,
                sourceMaps: true
            }))
            // .pipe(sourcemaps.write('../../www/build/app'))
            .pipe(gulp.dest('app/dist'));
    });

    gulp.task('compile-dev-tsc', function () {
        return tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(typescript(tsProject))
            .pipe(inlineNg2Template({
                base: '/',
                target: 'es5',
                useRelativePaths: true,
                removeLineBreaks: true,
                sourceMaps: true
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('app'));
    });
}