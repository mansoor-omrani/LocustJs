/// <binding />
module.exports = function (grunt) {
	
    grunt.initConfig({
		pkg: grunt.file.readJSON("src/all.json"),
        concat: {
			locustJs: {
				src: new Array("<%= pkg.locustJs %>"),
				dest: "dist/locust.js"
			}
        },
        uglify: {
			locustJs: {
				src: "dist/locust.js",
				dest: "dist/locust.min.js"
			}
        },
		jshint: {
			files: new Array("<%= pkg.locustJs %>"),
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: false,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				smarttabs: true,
				node: true,
				es5: false,
				strict: false
			},
			globals: {
				Image: true,
				window: true,
				$: true
			}
		}
    });

	grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    
    grunt.registerTask("build", ["jshint", "concat", "uglify"]);
	grunt.registerTask("default", ["concat", "uglify"]);
};