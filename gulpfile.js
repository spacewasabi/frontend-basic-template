// Include plugins
var gulp = require('gulp'); 
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');

// Pathnames
var source = './app';
var dist = './dist'

/*** Tasks ***/

// BrowserSync
gulp.task('browser-sync', function() {
    var files = [
        './app/assets/css/styles.css',
        './app/assets/js/main.js',
        './app/*.html'
    ];
    browserSync.init(files, {
        
        server: {
            browser: 'chrome',
            //proxy: "http://localhost:8888/",
            baseDir: "./app"
        }
    });
});

// Compil Sass
gulp.task('sass', function() {
    return gulp.src(source + '/src/scss/*.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest(source + '/assets/css'))
        .pipe(browserSync.stream());
});

// Compil JS
gulp.task('compile', function(){
  return gulp.src(source + '/src/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(source + '/assets/js'))
    .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('stylesmin', function(){
  gulp.src([source + '/assets/css/**/*.css'])
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist + '/assets/css/'))
});

// Minify JS
gulp.task('scriptsmin', function(){
  return gulp.src(source + '/assets/js/**/*.js')
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dist + '/assets/js/'))
});

// Tinyfy Images
gulp.task('imagesmin', function(){
  gulp.src(source + '/assets/imgs/**/*')
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(dist +'/assets/imgs/'));
});


/*** Start Tasks ***/

gulp.task('default', ['compile', 'sass', 'browser-sync'], function() {
    gulp.watch(source + '/src/scss/*.scss', ['sass']);
    gulp.watch(source + '/src/js/*.js', ['compile']);
});

gulp.task('build', ['stylesmin', 'scriptsmin', 'imagesmin']);
