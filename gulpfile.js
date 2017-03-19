var gulp = require('gulp');
var rev = require('gulp-rev');// 引用文件名更改为文件名-哈希码
var revReplace = require('gulp-rev-replace');// 文件名变了，这个插件用来改变引用的文件名
var useref = require('gulp-useref');// 在html里可以通过注释的方法写一些注释，告诉gulp该合并哪些文件，以及合并方式
var filter = require('gulp-filter');// 筛选某些文件(比如筛选css/js) 然后做处理(压缩完)，处理完再放回去
var uglify = require('gulp-uglify');// 压缩js
var csso = require('gulp-csso');// 压缩css

gulp.task('default',function () {
    var jsFilter = filter('**/*.js',{restore: true});
    var cssFilter = filter('**/*.css',{restore: true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore: true});// ['**/*','!**/index.html'] 选择所有文件，排除首页，首页最后还命名为index

    return gulp.src('src/index.html')// 拿到要处理的文件
        .pipe(useref())// 根据注释 把该合并的合并
        .pipe(jsFilter)// 筛选js
        .pipe(uglify())// 压缩
        .pipe(jsFilter.restore)// 压缩完再扔回流里
        .pipe(cssFilter)// 筛选css
        .pipe(csso())// 压缩
        .pipe(cssFilter.restore)// 压缩完再扔回流里
        .pipe(indexHtmlFilter)// 筛选html
        .pipe(rev())// 添加哈希码
        .pipe(indexHtmlFilter.restore)//处理完再扔回流里
        .pipe(revReplace())// 更新index里的所有被处理的文件引用
        .pipe(gulp.dest('dist'));// 处理完的文件流放到dist这个目录下
})
gulp.task('copyimg',function () {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
})
gulp.task('copyico',function () {
    return gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist'));
})

