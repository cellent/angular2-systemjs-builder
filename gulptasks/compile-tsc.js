module.exports = function (gulp, isRelease) {
    var typescript = require('gulp-typescript');
    var inlineNg2Template = require('gulp-inline-ng2-template');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var insert = require('gulp-insert');
    var tsProject = typescript.createProject('./tsconfig.json');

    gulp.task('compile-tsc', function () {
        var dest = 'app';
        if (isRelease)
            dest = 'app/dist';
        var chain = tsProject.src();
        if (!isRelease)
            chain = chain
                .pipe(sourcemaps.init());

        chain = chain
            .pipe(typescript(tsProject))
            .pipe(inlineNg2Template({
                base: '/',
                target: 'es5',
                useRelativePaths: true,
                removeLineBreaks: true,
                sourceMaps: true
            }));

        if (!isRelease)
            chain = chain
                .pipe(sourcemaps.write('.'));

        return chain
            .pipe(gulp.dest(dest));
    });
}