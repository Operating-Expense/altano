const postcss = require('gulp-postcss');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync');

gulp.task('css', function () {
    var processors = [
        mqpacker,
        autoprefixer,
        cssnano
    ];
    return gulp.src('./app/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('watch', ['browserSync', 'css'], function () {
    gulp.watch('app/**/*.sass', ['css']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/**/*.js', browserSync.reload);
})

gulp.task('browserSync', () =>
    browserSync({
        server: {
            baseDir: 'app'
        }
    }))