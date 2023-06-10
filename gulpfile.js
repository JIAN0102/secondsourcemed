const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require("browser-sync");
const autoprefixer = require("autoprefixer");
const minimist = require("minimist");
const extender = require("gulp-html-extend");
const gulpSequence = require("gulp-sequence").use(gulp);

// production || development
// # gulp --env production
const envOptions = {
  string: "env",
  default: { env: "development" },
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task("clean", () => {
  return gulp.src(["./assets", "./.tmp"], { read: false }).pipe($.clean());
});

gulp.task("html", () => {
  return gulp
    .src(["./src/**/!(_)*.html"])
    .pipe(extender({ annotations: false, verbose: false }))
    .pipe(gulp.dest("./assets"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("babel", function () {
  return gulp
    .src(["./src/js/app/*.js"])
    .pipe($.plumber())
    .pipe($.concat("app.js"))
    .pipe(
      $.babel({
        presets: ["es2015"],
      })
    )
    .pipe(
      $.if(
        options.env === "production",
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
    )
    .pipe(gulp.dest("./assets/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("vendorJs", function () {
  return gulp
    .src([
      "./src/js/vendor/*.js",
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/aos/dist/aos.js",
      "./node_modules/swiper/swiper-bundle.js",
      "./node_modules/intl-tel-input/build/js/intlTelInput.js",
    ])
    .pipe($.order(["jquery.js"]))
    .pipe($.concat("vendor.js"))
    .pipe($.if(options.env === "production", $.uglify()))
    .pipe(gulp.dest("./assets/js"));
});

gulp.task("sass", function () {
  return gulp
    .src("./src/css/*.scss")
    .pipe($.plumber())
    .pipe(
      $.sass({
        outputStyle: "nested",
        includePaths: [],
      }).on("error", $.sass.logError)
    )
    .pipe(
      $.postcss([
        autoprefixer({
          browsers: ["last 5 version"],
          grid: false,
          remove: false,
        }),
      ])
    )
    .pipe(
      $.if(
        options.env === "production",
        $.minifyCss({
          processImport: false,
        })
      )
    )
    .pipe(gulp.dest("./assets/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("imageMin", function () {
  gulp
    .src("./src/img/**/*")
    .pipe($.if(options.env === "production", $.image()))
    .pipe(gulp.dest("./assets/img"));
});

gulp.task("browserSync", function () {
  browserSync.init({
    server: { baseDir: "./assets" },
    reloadDebounce: 2000,
  });
});

gulp.task("watch", function () {
  gulp.watch(["./src/css/**/*.sass", "./src/css/**/*.scss"], ["sass"]);
  gulp.watch(["./src/**/*.html"], ["html"], ["extend"]);
  gulp.watch(["./src/js/**/*.js"], ["babel"]);
});

gulp.task(
  "sequence",
  gulpSequence("clean", "html", "sass", "babel", "vendorJs", "imageMin")
);

gulp.task("default", [
  "html",
  "sass",
  "babel",
  "vendorJs",
  "browserSync",
  "imageMin",
  "watch",
]);

gulp.task("build", ["sequence"]);
