import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sass from 'gulp-dart-sass';
import rimraf from 'rimraf';
import fileInclude from 'gulp-file-include';
import autoprefixer from 'gulp-autoprefixer';
import purgecss from 'gulp-purgecss';
import cleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';

const { task, parallel, watch, series, lastRun, src, dest } = gulp;

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 3000,
        notify: false
    });

});

gulp.task('import-html', () => {
    return src('./src/index.html')
        .pipe(fileInclude())
        .pipe(dest('dist'))
        // .pipe(browserSync.stream());
});

gulp.task('concatAndMinifyJs', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('buildStyles', function() {
    return gulp.src(['src/styles/**/*.scss'])
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(purgecss({
            content: ['src/**/*.html', 'src/**/*.js'],
            safelist: [],
            whitelist: ['body'],
            whitelistPatterns: [/^slick-/, /^slick/, /^ui-/, /^js-/]
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('optimizeImages', () => {
    return gulp.src('src/img/**/*.{jpg,png,svg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', (cb) => {
    return rimraf('./dist/*', { glob: true }, cb);
});

gulp.task('fonts', () => {
    return src('src/fonts/*')
        .pipe(dest('dist/fonts'))
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.html', gulp.series('import-html')).on('change', browserSync.reload);
    gulp.watch('src/**/*.js', gulp.series('concatAndMinifyJs')).on('change', browserSync.reload);
    gulp.watch('src/**/*.scss', gulp.series('buildStyles')).on('change', browserSync.reload);
    gulp.watch('src/img/**/*.{jpg,png,svg,gif}', gulp.series('optimizeImages')).on('change', browserSync.reload);

});

gulp.task('build', gulp.series('clean', gulp.parallel('import-html', 'concatAndMinifyJs', 'buildStyles', 'optimizeImages', 'fonts')));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'browserSync')))