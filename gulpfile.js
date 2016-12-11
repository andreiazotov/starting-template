var gulp         = require("gulp"),
    minifyCss    = require("gulp-clean-css"),
    concatCss    = require("gulp-concat-css"),
    concatJs     = require("gulp-concat"),
    autoprefixer = require("gulp-autoprefixer"),
    pug          = require("gulp-pug"),
    sass         = require("gulp-sass"),
    uglify       = require("gulp-uglify"),
    connect      = require("gulp-connect"),
    livereload   = require("gulp-livereload"),
    notify       = require("gulp-notify"),
    rename       = require("gulp-rename");

var path = {
    build: {
        html:  "dist/",
        js:    "dist/js/",
        css:   "dist/css/",
        img:   "dist/img/",
        fonts: "dist/fonts/"
    },
    src: {
        pug:    "src/index.pug",
        styles: "src/sass/main.sass",
        js:     "src/js/*.js",
        img:    "src/img/*.*",
        fonts:  "src/fonts/*.*"
    },
    watch: {
        pug:    "src/index.pug",
        styles: "src/sass/*.sass",
        js:     "src/js/*.js",
        images: "src/img/*.*"
    }
};

gulp.task("gulp:connect", function() {
    connect.server({
        root: "build",
        livereload: true
    });
});

gulp.task("gulp:html", function() {
    gulp.src(path.src.pug)
    .pipe(pug())
    .pipe(gulp.dest(path.build.html));
});

gulp.task("gulp:css", function() {
    gulp.src(path.src.styles)
    .pipe(sass())
    .pipe(autoprefixer("last 2 versions", ">1%", "ie9"))
    .pipe(minifyCss({compatibility: "ie8"}))
    .pipe(rename("styles.css"))
    .pipe(gulp.dest(path.build.css));
});

gulp.task("gulp:js", function() {
    gulp.src(path.src.js)
    .pipe(concatJs("script.js"))
    .pipe(gulp.dest(path.build.js));
});

gulp.task("gulp:images", function() {
    gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
});


gulp.task("gulp:fonts", function() {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task("gulp:watch", function() {
    gulp.watch(path.watch.pug, ["gulp:html"]);
    gulp.watch(path.watch.styles, ["gulp:css"]);
    gulp.watch(path.watch.js, ["gulp:js"]);
});

gulp.task("default", ["gulp:connect",
                      "gulp:images",
                      "gulp:fonts",
                      "gulp:html",
                      "gulp:css",
                      "gulp:js",
                      "gulp:watch"]);
