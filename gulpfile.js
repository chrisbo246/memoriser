var gulp = require('gulp'),
gutil = require('gulp-util'),
//sass = require('gulp-ruby-sass'),
//autoprefixer = require('gulp-autoprefixer'),
//cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
//uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
//rename = require('gulp-rename'),
//concat = require('gulp-concat'),
notify = require('gulp-notify'),
//cache = require('gulp-cache'),
//livereload = require('gulp-livereload'),
critical = require('critical').stream,
del = require('del');


gulp.task('critical', function () {
    return gulp.src('_site/*.html')
        .pipe(critical({base: '_site/', dest: '../_includes/styles/critical.min.css', css: ['_site/assets/main.css'], inline: false, minify: true}))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('_site'));
});

gulp.task('styles', ['critical'], function() {

});

gulp.task('scripts', function() {
  return gulp.src('_includes/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
  //  .pipe(concat('main2.js'))
  //  .pipe(gulp.dest('_site'))
  //  .pipe(rename({ suffix: '.min' }))
  //  .pipe(uglify())
  //  .pipe(gulp.dest('_site'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest('assets/images'))
  .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return del([]);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', images);
});
