const gulp = require('gulp');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const bs = require('browser-sync').create();


// 1. Выполнить команду jekyll build
/*gulp.task('jekyll:build', function (done) {
    spawn('jekyll', ['build'], {
        shell: true,
        stdio: 'inherit'
    }).on('close', done);
});*/

gulp.task('jekyll:build', function (done) {
    exec('jekyll build', function (error, stdout, stderr) {
        if(error) {
            console.log(`exec error ${error}`);
            return;
        }
        if (stdout) {
            console.log(`exec stdout: ${stdout}`);
        }
        if (stderr) {
            console.log(`exec stderr: ${stderr}`);
        }
        done();
    })
});


// 2. Запустить локальный сервер из директории _site
gulp.task('browser-sync', ['jekyll:build'],  function () {
   bs.init({
       server: {
           baseDir: "_site"
       }
   });
});
// 3. Следить за изменнениями файлами и перезапускать сервер и сборку нашего сайта


gulp.task('jekyll:rebuild', ['jekyll:build'], function () {
    bs.reload();
});

gulp.task('watch', function () {
    gulp.watch('*.html', ['jekyll:rebuild']);
});

gulp.task('serve', ['browser-sync', 'watch'])