"use sctrict";

var gulp = require("./../node_modules/gulp"),
    connect = require("./../node_modules/gulp-connect"),
    less = require('./../node_modules/gulp-less'),
    minify = require('./../node_modules/gulp-minify'),
    autoprefixer = require('./../node_modules/gulp-autoprefixer'),
    cssc = require('./../node_modules/gulp-css-condense'),
    opn = require("./../node_modules/opn");

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});


// Работа с Less
gulp.task('less', function () {
  gulp.src('app/less/*.less')
    .pipe(less()) 
    .pipe(autoprefixer({ browsers: ["> 0%"] }))   
    .pipe(cssc({
            consolidateViaDeclarations: false,
            consolidateViaSelectors: false,
            consolidateMediaQueries: true
        })) 
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});

// Работа с HTML
gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

// Работа с JS
gulp.task('js', function(){
  gulp.src('app/pre-js/*.js')
    .pipe(minify({
        ext: {
            min: '.min.js'
        },
        noSource: true,
        ignoreFiles: ['*.min.js']
    }))
    .pipe(gulp.dest('app/js'))
});

// Слежка
gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/pre-js/*.js'], ['js']);
  gulp.watch(['app/less/*.less'], ['less']);
});

// Задача по-умолчанию
gulp.task('default', ['connect', 'watch']);