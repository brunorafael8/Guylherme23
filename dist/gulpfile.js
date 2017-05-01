var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,concat = require('gulp-concat')
  ,uglify = require('gulp-uglify')
  ,browserSync = require('browser-sync')
  ,csslint = require('gulp-csslint')
  ,autoprefixer = require('gulp-autoprefixer')

gulp.task('default', ['copy'], function() {
    gulp.start('build-img');
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-img', function() {

  return gulp.src('dist/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
})

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: ''
        }
    });

    gulp.watch('**/*').on('change', browserSync.reload);

    gulp.watch('js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch('css/**/*.css').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.reporter());
    });    

});