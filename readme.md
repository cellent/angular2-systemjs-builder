# Angular 2 SystemJS Builder Template

This template is a basic [Angular 2](https://angular.io/) application which uses [SystemJS](https://github.com/systemjs/systemjs) for bundling and [SystemJS Builder](https://github.com/systemjs/builder) for bundling the dependencies and statics.

# Install / Getting started

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

# How to develop

For development and watching the Typescript changes run
```
gulp watch
```
This will compile your typescript into javascript and generates the needed map-files.

If you need a local webserver you can use this package:
```
npm install -g local-web-server
```
Start the local webserver using:
```
ws --port 80
```

# Build a release version

If you need to deploy a new version of your project you have to create a new release build. The integrated gulp scripts can handle this for you. So if you want to run a release build just type:
```
gulp build --release
```
After the process has run successfully you can pick your files from the 'www' folder and copy them to your web server. Enjoy!

## TODO

More documentation to do...