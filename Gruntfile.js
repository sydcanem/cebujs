'use strict';

module.exports = function (grunt) {
	// load all grunt task
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var assetsConfig = {
		root: 'public',
		app: 'public/app'
	}

	grunt.initConfig({
		assets: assetsConfig,
		exec: {
			public_grunt: {
				command: 'grunt --force build',
				cwd: assetsConfig.root
			}
		},
		watch: {
			livereload: {
				files: [
					'app.js',
					'app/{,*/}*.js',
					'lib/{,*/}*.js',
					'<%= assets.app %>/styles/{,*/}*.css',
					'<%= assets.app %>/scripts/{,*/}*.js',
					'<%= assets.app %>/views/{,*/}*.ejs',
					'<%= assets.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
				],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					ignoredFiles: ['README.md', 'node_modules/**', 'public/**'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'lib', 'public/app/views']
				}
			}
		},
		concurrent: {
			target: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.registerTask('develop', ['concurrent']);
	grunt.registerTask('default', ['exec']);
};