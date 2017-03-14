var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha')

gulp.task('test', function() {
    gulp.src('./test/**')
        .pipe(mocha())
})
gulp.task('default', ['test'], function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**'],
        tasks: ['test']
    })
})