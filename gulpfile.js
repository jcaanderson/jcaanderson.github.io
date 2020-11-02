var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');

var paths = {
  styles: {
    src: 'assets/scss/**/*.scss',
    dest: 'web/css'
  },
  scripts: {
    src: 'assets/js/**/*.js',
    dest: 'web/js'
  },
  imgs: {
    src: 'assets/img/**/*{gif,jpg,png,svg}',
    dest: 'web/img'
  }
};

function styles() {
  return gulp
    .src(paths.styles.src, {
      sourcemaps: true
    })
    .pipe(
      sass({
        includePaths: require("node-normalize-scss").includePaths
      })
    )
    .pipe(rename({
      basename: 'styles',
      suffix: '.min'
    }))
    .pipe(cleanCSS({debug: true}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true
    })
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function copyImgs() {
  return gulp
    .src(paths.imgs.src, {
      sourcemaps: true
    })
    .pipe(gulp.dest(paths.imgs.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.imgs.src, copyImgs);
}

var build = gulp.parallel(styles, scripts, copyImgs, watch);

gulp.task(build);
gulp.task('default', build);