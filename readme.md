# Angular 2 SystemJS Builder Template

This template is a basic [Angular 2](https://angular.io/) application which uses [SystemJS](https://github.com/systemjs/systemjs) for bundling and [SystemJS Builder](https://github.com/systemjs/builder) for bundling the dependencies and statics.

# Install

1. Download or clone the project
2. If not present install gulp globally
```
npm install -g gulp
```
3. Install the packages
```
npm install
```
4. Done!

# Build / Develop

Currently there are two types of builds are available using gulp.
* Watching Changes
* Build

both commands are available as gulp tasks:
```
gulp build
```
This command runs the develop build once and compiles the typescript files into javascript.
```
gulp watch
```
This command runs the develop build once and then it is watching for changes. So if you make changes to your typescript files the build will run again.

## Release build
If you're done with development you can make a release build for deployment. Most times during development you're adding many npm packages. You don't want to copy all these node_modules to your production server. So for this case we build a release command which merges only the used dependencies into one file.

To run the build command you only have to do this:
```
gulp build --release
```
You also can automatically build a new release version every time you make changes:
```
gulp watch --release
```

After the build runs successfully, you can take the content of the 'wwww' folder and copy it to your webserver. Done!

## Local web server during development

For testing your application you need a local web server during development. For example you can use IIS Express or something else. But in case you want to use a lightweight web server which can be installed using npm you may get it with this one:
```
npm install -g local-web-server
```
To start the web server, navigate to your root folder of your project (where the package.json and the index.html is located) and run:
```
ws --port 80
```
The full documentation of the local-web-server can be found [here](https://www.npmjs.com/package/local-web-server).