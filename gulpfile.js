/*globals
require
*/

// Define gulp before we start
var gulp = require('gulp');

// Define Sass and the autoprefixer
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');


// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');

// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
// The folder, files to look for and destination are all required for sass
var paths = {

    styles: {
        src: './src/framework/scss',
        files: './src/framework/scss/**/*.scss',
        dest: './public/css'
    },

    // scripts: {
    //     src: './src/framework/js',
    //     files: './src/framework/js/**/*.js',
    //     dest: './public/js'
    // },

    html: {
        src: './src',
        files: './src/*.html',
        dest: './public'
    }
};


// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace('\n',''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if (error.fileName)
        errorString += ' in ' + error.fileName;

    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};


// Setting up the sass task
gulp.task('sass', function(){

    gulp.src(paths.styles.files)
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
            includePaths : [paths.styles.src]
        }))
        .on('error', function(err){
            displayError(err);
        })
        .pipe(prefix('last 2 version', 'Explorer > 8', 'iOS > 6', 'Android > 3'))
        .pipe(gulp.dest(paths.styles.dest));
});

// gulp.task('js', function() {
//     gulp.src(paths.scripts.files)
//         .pipe(concat('framework.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.scripts.dest));
// });

gulp.task('html', function() {
    gulp.src(paths.html.files)
        .pipe(gulp.dest(paths.html.dest));
});


// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
gulp.task('default', ['sass', 'html'], function() {
    gulp.watch(paths.styles.files, ['sass'])
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=\/scss)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });

    // gulp.watch(paths.scripts.files, ['js'])
    // .on('change', function(evt) {
    //     console.log(
    //         '[watcher] File ' + evt.path.replace(/.*(?=\/js)/,'') + ' was ' + evt.type + ', compiling...'
    //     );
    // });

    gulp.watch(paths.html.files, ['html'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=\/src)/,'') + ' was ' + evt.type + ', moving...'
            );
        });
});
