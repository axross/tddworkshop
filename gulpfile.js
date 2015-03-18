var gulp            = require('gulp');
var browserify      = require('browserify');
var transform       = require('vinyl-transform');
var plumber         = require('gulp-plumber');
var compass         = require('gulp-compass');
var filter          = require('gulp-filter');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var karma           = require('karma').server;
var mocha           = require('gulp-mocha');
var espower         = require('gulp-espower');
var intercept       = require("intercept-stdout");
var fs              = require('fs');

gulp.task('browserify', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });
    return gulp.src(['./src/**/entry.js'])
        .pipe(browserified)
        .pipe(gulp.dest('./js/'));
});

gulp.task('compass', function() {
    gulp.src('./sass/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
        config_file: './config.rb',
        comments: false,
        css: './css/',
        sass: 'sass',
        sourcemap: false
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html").on('change', reload);
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
        process.exit(0);
    });
});

gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('mocha', function () {
    return gulp.src('src/**/*.mocha.js', {read: false})
        .pipe(espower())
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('mocha-tdd', function () {
    gulp.watch('./src/**/*.js', ['mocha']);
});

gulp.task('mocha-result', function () {
    var ws = fs.createWriteStream('result/mocha.json');
    var unhook_intercept = intercept(function(txt) {
        ws.write(txt);
    });
    return gulp.src('src/**/*.mocha.js', {read: false})
        .pipe(espower())
        .pipe(mocha({reporter: 'json'})).on('end', function() {
            ws.end();
            unhook_intercept();
        });
});

gulp.task('default',['browser-sync'], function() {
    gulp.watch('sass/**/*.scss', ['compass']);
    gulp.watch('./src/**/*.js', ['browserify']);
});