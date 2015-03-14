var gulp = require('gulp'),
    bowerFiles = require("main-bower-files");
var $ = require("gulp-load-plugins")();
var projectDir = "static/";
var jsFiles = {
    "vendor": bowerFiles({filter: '**/*.js'}),
    "local": projectDir + "src/js/*.jsx"
};
var cssFiles = {
    "vendor": bowerFiles({filter: '**/*.css'}),
    "local": projectDir + "src/css/*.scss"
};

// js
gulp.task('js-vendor', function() {
    return gulp.src(jsFiles.vendor)
        .pipe($.concat('vendor.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe(gulp.dest(projectDir + 'dist/js'))
        .on('error', function (error) {
            console.error('' + error);
        })
        .pipe($.notify({message: 'Javascript vendor task complete'}));
});

gulp.task('js-local', function() {
    return gulp.src(jsFiles.local)
        .pipe($.sourcemaps.init())
        .pipe($.react({harmony: true}))
        .pipe($.concat('main.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(projectDir + 'dist/js'))
        .on('error', function (error) {
            console.error('' + error);
        })
        .pipe($.notify({message: 'Javascript local task complete'}));
});

gulp.task('js', function() {
    gulp.start('js-vendor', 'js-local');
});

// css
gulp.task('css-vendor', function() {
    return gulp.src(cssFiles.vendor)
        .pipe($.concat('vendor.css'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.minifyCss())
        .pipe(gulp.dest(projectDir + 'dist/css'))
        .on('error', function (error) {
            console.error('' + error);
        })
        .pipe($.notify({message: 'Style vendor task complete'}));
});

gulp.task('css-local', function() {
    return gulp.src(cssFiles.local)
        .pipe($.sourcemaps.init())
        .pipe($.autoprefixer({browsers: '> 1%', cascade: false, remove: true}))
        .pipe($.concat('main.css'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.sass({errLogToConsole: true}))
        .pipe($.sourcemaps.write('.'))
        .pipe($.minifyCss())
        .pipe(gulp.dest(projectDir + 'dist/css'))
        .on('error', function (error) {
            console.error('' + error);
        })
        .pipe($.notify({message: 'Style local task complete'}));
});

gulp.task('css', function() {
    gulp.start('css-vendor', 'css-local');
});

// images
//TODO maybe compress images (imagemin)?

// fonts
gulp.task('fonts-vendor', function() {
    return gulp.src(bowerFiles({filter: '**/*.{eot,svg,ttf,woff,woff2}'}))
        .pipe(gulp.dest(projectDir + 'dist/fonts'))
        .on('error', function (error) {
            console.error('' + error);
        })
        .pipe($.notify({message: 'Fonts vendor file written'}));
});

gulp.task('fonts', function() {
    gulp.start('fonts-vendor');
});

// grouped tasks
gulp.task('local', function() {
    gulp.start('css-local', 'js-local');
});

gulp.task('vendor', function() {
    gulp.start('css-vendor', 'js-vendor', 'fonts-vendor');
});

gulp.task('build', function() {
    gulp.start('css', 'js', 'fonts');
});

// main
gulp.task('default', function() {
    // watch css
    gulp.watch(cssFiles.local, ['css-local']);

    // watch js
    gulp.watch(jsFiles.local, ['js-local']);
});


// Workaround for https://github.com/gulpjs/gulp/issues/71
var origSrc = gulp.src;
gulp.src = function () {
    return fixPipe(origSrc.apply(this, arguments));
};
function fixPipe(stream) {
    var origPipe = stream.pipe;
    stream.pipe = function (dest) {
        arguments[0] = dest.on('error', function (error) {
            var nextStreams = dest._nextStreams;
            if (nextStreams) {
                nextStreams.forEach(function (nextStream) {
                    nextStream.emit('error', error);
                });
            } else if (dest.listeners('error').length === 1) {
                throw error;
            }
        });
        var nextStream = fixPipe(origPipe.apply(this, arguments));
        (this._nextStreams || (this._nextStreams = [])).push(nextStream);
        return nextStream;
    };
    return stream;
}
