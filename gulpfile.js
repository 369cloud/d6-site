var gulp = require('gulp'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	paths = {
		site: {
			root: '_site/',
			index: 'D6/index.html'
		}
	};
gulp.task('jekyll', function(cb) {
	// 编译 Jekyll
	// exec('jekyll.bat server --watch', function(err) {
	// 	if (err) return cb(err); // 返回 error
	// 	cb(); // 完成 task
	// });
	spawn('jekyll.bat', ['build', '--watch'], {
		stdio: 'inherit'
	});
	cb();
});


gulp.task('connect', function(cb) {
	connect.server({
		root: [paths.site.root],
		port: '8080'
	});
	cb();
});

gulp.task('open', function(cb) {
	gulp.src(paths.site.root + paths.site.index).pipe(open('', {
		url: 'http://localhost:8080/' + paths.site.index
	}));
	cb();
});

gulp.task('default', gulp.series('jekyll', 'connect', 'open'));