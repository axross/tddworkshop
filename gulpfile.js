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
var intercept       = require("intercept-stdout");
var fs              = require('fs');
var rename = require("gulp-rename");
var map = require('map-stream');
var File = require('vinyl');

require('intelli-espower-loader');

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
    return gulp.src('src/**/*.mocha.js')
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('mocha-tdd', function () {
    gulp.run('mocha');
    gulp.watch('./src/**/*.js', ['mocha']);
});

gulp.task('mocha-result', function () {
    var ws = fs.createWriteStream('result/mocha.json');
    var unhook_intercept = intercept(function(txt) {
        ws.write(txt);
    });
    return gulp.src('src/**/*.mocha.js')
        .pipe(mocha({reporter: 'json'})).on('end', function() {
            ws.end();
            unhook_intercept();
        });
});

gulp.task('copy-answer', function () {
    return gulp.src('src/**/*.js', {base: 'src'})
        .pipe(filter(['*', '!*.mocha.js', '!*.karma.js', '!*.answer.js', '!view.js', '!entry.js']))
        .pipe(rename({suffix: '.answer'}))
        .pipe(gulp.dest('./src/'));
});

gulp.task('start-hacking', ['copy-answer'], function () {
    return gulp.src('src/**/*.js', {base: 'src'})
        .pipe(filter(['**/*', '!**/*.mocha.js', '!**/*.karma.js', '!**/*.answer.js', '!view.js', '!entry.js']))
        .pipe(map(function(file, callback) {
            callback(null, new File({path: file.path, contents: new Buffer('')}));
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default',['browser-sync'], function() {
    gulp.watch('sass/**/*.scss', ['compass']);
    gulp.watch('./src/**/*.js', ['browserify']);
});