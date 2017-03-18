var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ''
        },
        notify: false
    });
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch(['*.html', './js/*.js', './css/*.css'], browserSync.reload);
});