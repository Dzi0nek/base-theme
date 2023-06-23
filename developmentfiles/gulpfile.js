/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run prod //To generate minifed files for live server
*/

const { src, dest, task, watch, series, parallel } = require('gulp');
const del = require('del'); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass')(require('sass')); //For Compiling SASS files
const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config
const concat = require('gulp-concat'); //For Concatinating js,css files
const uglify = require('gulp-terser');//To Minify JS files
const imagemin = require('gulp-imagemin'); //To Optimize Images
const cleanCSS = require('gulp-clean-css');//To Minify CSS files
const purgecss = require('gulp-purgecss');// Remove Unused CSS from Styles
const autoprefixer = require('gulp-autoprefixer');
const logSymbols = require('log-symbols'); //For Symbolic Console logs :) 

//Load Previews on Browser on dev
function livePreview(done){
  browserSync.init({
    proxy: "localhost:80/dailycode/mpc",
    port: 80,
    notify: false,
    ui: false,
  });
  done();
} 

// Triggers Browser reload
function previewReload(done){
  console.log("\n\t" + logSymbols.info,"Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

// DEVELOPMENT ////////////////////////////////////////////////
//Development Tasks
function devTWIG(){
  return src(`${options.paths.src.templates}/**/*`).pipe(dest(options.paths.dist.templates));
}
// Copying Images
function devImages(){
  return src(`${options.paths.src.img}/**/*`).pipe(dest(options.paths.dist.img));
}
// Copying WP files (PHP, screenshot.png. style.css)
function devWP(){
  return src(`${options.paths.src.base}/*.{php,css,png}`).pipe(dest(options.paths.dist.base));
}
// Copying Fonts
function devFonts(){
  return src(`${options.paths.src.fonts}/**/*`).pipe(dest(options.paths.dist.fonts));
} 
// Copying Static folder
function devStatic(){
  return src(`${options.paths.src.base}/static/**/*`).pipe(dest(options.paths.dist.base + '/static'));
} 


// Style Processing
function devStyles(){
  const tailwindcss = require('tailwindcss'); 
  return src(`${options.paths.src.css}/**/*.scss`).pipe(sass().on('error', sass.logError))
    .pipe(postcss([tailwindcss(options.config.tailwindjs)]))
    .pipe(cleanCSS({
      advanced: false,
      compatibility: '',
      keepBreaks: false,
      keepSpecialComments: 0
  }))
    .pipe(concat({ path: 'bundle.css'}))
    .pipe(dest(options.paths.dist.css));
}

// Scripts Processing
function devScripts(){
  return src([
    `${options.paths.src.js}/**/*.js`,
  ]).pipe(concat({ path: 'bundle.js'})).pipe(dest(options.paths.dist.js));
}

// Watching files for changes
function watchFiles(){
  watch(`${options.paths.src.base}/**/*.twig`,series(devTWIG, devStyles, previewReload));
  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],series(devStyles, previewReload));
  watch(`${options.paths.src.js}/**/*.js`,series(devScripts, previewReload));
  watch(`${options.paths.src.base}/*.php`,series(devWP, previewReload));
  watch(`${options.paths.src.img}/images/*`,series(devImages, previewReload));
  console.log("\n\t" + logSymbols.info,"Watching for Changes..\n");
}

// Cleaning Dist Folder
function devClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning dist folder for fresh start.\n");
  return del([options.paths.dist.base]);
}


// PRODUCTION ////////////////////////////////////////////////
//Production Tasks (Optimized Build for Live/Production Sites)
function prodClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning build folder for fresh start.\n");
  return del([options.paths.build.base]);
}

function prodTWIG(){
  return src(`${options.paths.src.templates}//**/*`).pipe(dest(options.paths.build.templates));
}
// Copying WP files (PHP, screenshot.png. style.css)
function prodWP(){
  return src(`${options.paths.src.base}/*.{php,css,png}`).pipe(dest(options.paths.build.base));
}
// Copying Fonts
function prodFonts(){
  return src(`${options.paths.src.fonts}/**/*`).pipe(dest(options.paths.build.fonts));
} 
function prodImages(){
  return src(options.paths.src.img + '/**/*').pipe(imagemin()).pipe(dest(options.paths.build.img));
}
// Copying Static folder
function prodStatic(){
  return src(`${options.paths.src.base}/static/**/*`).pipe(dest(options.paths.build.base + '/static'));
} 

function prodStyles() {
  return src(`${options.paths.dist.css}/**/*`)
    .pipe(
      purgecss({
        content: ["src/**/*.{html,js,php}"],
        defaultExtractor: (content) => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches =
            content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest(options.paths.build.css));
}

function prodScripts(){
  return src([
    `${options.paths.src.js}/**/*.js`
  ])
  .pipe(concat({ path: 'bundle.js'}))
  .pipe(uglify())
  .pipe(dest(options.paths.build.js));
}


function buildFinish(done){
  console.log("\n\t" + logSymbols.info,`Production build is complete. Files are located at ${options.paths.build.base}\n`);
  done();
}

exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devScripts, devImages, devTWIG, devFonts, devWP, devStatic), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);

exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, prodScripts, prodImages, prodTWIG, prodFonts, prodWP, prodStatic), //Run All tasks in parallel
  buildFinish
);