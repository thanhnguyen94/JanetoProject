var gulp = require('gulp');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var nodeInspector = require('gulp-node-inspector');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var apidoc = require('gulp-apidoc');
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var exec = require('child_process').exec;
var angularFilesort = require('gulp-angular-filesort');
var exit = require('gulp-exit');
var gls = require('gulp-live-server');

gulp.task('inject', function() {
    gulp.src('./client/index.template.html')
        .pipe(inject(gulp.src(['./client/javascripts/*.js', './client/javascripts/**/*.js', './client/javascripts/**/**/*.js', './client/javascripts/**/**/*.css', './client/style/component/*.css'], {
            read: false
        }), {
            relative: true
        }))
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./client'));

});
gulp.task('inject-build', ['copy'], function() {
    gulp.src('./client/index.template.html')
    .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build'))
        .pipe(inject(gulp.src(['./build/min/app.min.css', './build/min/app.min.js'], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest('./build'));
});
gulp.task('default', ['inject'], function() {
    var server = gls.static('client', 6789);
    server.start();
});

gulp.task('serve', ['inject-build'], function() {
    exec('node ./server/app.js serve', function(err, srdout, stderr) {
        console.log(srdout);
        console.log(stderr);
    });
});

gulp.task('clean-build', function() {
    return gulp.src('./build')
        .pipe(clean());
});

gulp.task('cssmin', ['clean-build'], function() {
    gulp.src('./client/style/component/*.css')
        .pipe(cssmin())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./build/min'));
});

gulp.task('compress', ['cssmin'], function() {
    return gulp.src([
            './client/javascripts/*.js', './client/javascripts/**/*.js', './client/javascripts/**/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./build/min'));
});

gulp.task('copy', ['compress'], function() {
    return gulp.src([
            './client/avatar/**',
            './client/bower_components/**',
            './client/font/**',
            './client/images/**',
            './client/javascripts/lib/**',
            './client/javascripts/**/*.html',
            './client/sound/**',
            './client/404.html'
        ], {
            base: "./client"
        })
        .pipe(gulp.dest('./build'));
});

gulp.task('debug', ['inject'], function() {
    gulp.src(['server'])
        .pipe(nodeInspector({
            debugPort: 5858,
            webHost: '0.0.0.0',
            webPort: 8080,
            saveLiveEdit: false,
            preload: true,
            inject: true,
            hidden: [],
            stackTraceLimit: 50,
            sslKey: '',
            sslCert: ''
        }));
    nodemon({
        script: 'server/app.js',
        nodeArgs: ['--debug'],
        ignore: ['node_modules/**', 'client/**', 'e2e/**'],
        ext: 'js html',
        tasks: ['inject']
    }).on('restart', function(e) {
        console.log(e);
    });
});

gulp.task('debug-brk', ['inject'], function() {
    gulp.src(['server'])
        .pipe(nodeInspector({
            debugPort: 5858,
            webHost: '0.0.0.0',
            webPort: 8080,
            saveLiveEdit: false,
            preload: true,
            inject: true,
            hidden: [],
            stackTraceLimit: 50,
            sslKey: '',
            sslCert: ''
        }));
    nodemon({
        script: 'server/app.js',
        nodeArgs: ['--debug-brk'],
        ignore: ['node_modules/**', 'client/**', 'e2e/**'],
        ext: 'js html',
        tasks: ['inject']
    }).on('restart', function(e) {
        console.log(e);
    });
});

gulp.task('apidoc', function(done) {
    apidoc({
        src: "./server/api/",
        dest: "./docs/",
        includeFilters: ["index.js"]
    }, done);
});

gulp.task('eslint', function() {
    return gulp.src([
            './client/javascripts/*.js',
            './client/javascripts/filter/*.js',
            './client/javascripts/service/*.js',
            './client/javascripts/controller/**/*.js',
            './client/javascripts/directive/**/*.js'
        ])
        .pipe(eslint({
            "env": {
                "node": true
            },
            "globals": {
                "angular": true,
                "app": true,
                "d3": true,
                "$": true,
                "_": true,
                "document": true,
                "window": true,
                "toastr": true,
                "jsPlumb": true,
                "Snap": true,
                "Bloodhound": true,
                "required": true,
                "emit": true,
                "FileReader": true,
                "Image": true,
                "moment": true,
                "emotify": true,
                "io": true,
                "wrapper": true,
                "Notification": true,
                "XMLHttpRequest":true,
                "saveAs":true
            },
            "rules": {
                "strict": [0, "global"],
                "eqeqeq": [1, "smart"],
                "quotes": [1, "single"],
                "camelcase": [1, {
                    "properties": "never"
                }],
                "no-underscore-dangle": 0,
                "no-use-before-define": [2, "nofunc"],
                "indent": [1, 4],
                "semi": [1, "always"],
                "eol-last": [1],
                "comma-spacing": [2],
                "handle-callback-err": [2],
                "no-shadow": [2],
                "no-unused-vars": [2],
                "no-undef": [2],
                "curly": [2],
                "new-cap": [2, {
                    "capIsNewExceptions": ["Router"]
                }],
                "no-multi-spaces": [2],
                "key-spacing": [2],
                "comma-dangle": [2],
                "space-infix-ops": [2],
                "space-after-keywords": [2],
                "brace-style": [2],
                "no-path-concat": [2],
                "no-mixed-spaces-and-tabs": [2]
            },
            "ecmaFeatures": {
                "blockBindings": true
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
