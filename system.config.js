 System.config({
        baseURL: '/',
        packages: {
            app: {
                format: 'register',
                defaultExtension: 'js'
            }
        },
        paths: {
            '*': './node_modules/*',
            'app/*': 'app/*',
            '@angular/core': './node_modules/@angular/core/index.js',
            '@angular/http': './node_modules/@angular/http/index.js',
            '@angular/compiler': './node_modules/@angular/compiler/index.js',
            '@angular/common': './node_modules/@angular/common/index.js',
            '@angular/router': './node_modules/@angular/router/index.js',
            '@angular/platform-browser': './node_modules/@angular/platform-browser/index.js',
            '@angular/platform-browser-dynamic': './node_modules/@angular/platform-browser-dynamic/index.js'
        },
        defaultJSExtensions: true
    });