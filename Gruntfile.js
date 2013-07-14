'use strict';

module.exports = function (grunt) {
	// load all grunt task
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		watch: {
			livereload: {
				files: [
					'app.js',
					'app/**/**.js',
					'lib/**/**.js'
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
};