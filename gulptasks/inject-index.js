module.exports = function (gulp, isRelease, config) {
    var inject = require('gulp-inject');
    var injectString = require('gulp-inject-string');
    var rename = require("gulp-rename");
    var injectfile = require("gulp-inject-file");

    gulp.task('inject-index', function () {
        // develop
        if (!isRelease) {
            var polyfills = [
                './node_modules/systemjs/dist/system-polyfills.js',
                './node_modules/reflect-metadata/Reflect.js',
                './node_modules/es6-shim/es6-shim.min.js',
                './node_modules/zone.js/dist/zone.js',
                './node_modules/systemjs/dist/system.src.js'
            ];
            return gulp.src('./index-template.html')
                .pipe(inject(gulp.src(polyfills, { read: false }), { starttag: '<!-- inject:head-develop:{{ext}} -->', removeTags: true }))
                .pipe(injectfile({ pattern: '<!--\\s*inject:<filename>-->' }))
                .pipe(rename("./index.html"))
                .pipe(gulp.dest('.'));
        }

        // release
        var static = './www/build/static.js';
        var deps = './www/build/dependencies.js';
        var chain = gulp.src('./index-template.html');

        transform = function (filepath, file, i, length) {
            filepath = filepath.replace('/www/', '');
            var result = '<script src="' + filepath + '"></script>';
            return result;
        }

        chain = chain.pipe(inject(gulp.src(static, { read: false }), { starttag: '<!-- inject:head-rel-static:{{ext}} -->', transform: transform, removeTags: true }));
        chain = chain.pipe(inject(gulp.src(deps, { read: false }), { starttag: '<!-- inject:head-rel-deps:{{ext}} -->', transform: transform, removeTags: true }));
        chain = chain.pipe(injectfile({ pattern: '<!--\\s*inject:<filename>-->' }));
        chain = chain.pipe(injectString.replace('"baseURL": "/",', '"baseURL": "/build",'));
        chain = chain.pipe(rename('index.html'));
        return chain.pipe(gulp.dest('./www'));
    });
}