/* global module, require */

module.exports = function( grunt ) {

	'use strict';

	var pkg = grunt.file.readJSON( 'package.json' );

	grunt.initConfig( {

		pkg: pkg,

		autoprefixer: {
			options: {
				browsers: [
					'Android >= 2.1',
					'Chrome >= 21',
					'Edge >= 12',
					'Explorer >= 7',
					'Firefox >= 17',
					'Opera >= 12.1',
					'Safari >= 6.0'
				],
				cascade: false
			},
			editor: {
				src: [ 'editor-style.css' ]
			},
			main: {
				src: [ 'style.css' ]
			}
		},

		clean: {
			options: {
				force: true
			},
			build: [ 'build/*' ]
		},

		copy: {
			build: {
				expand: true,
				cwd: '.',
				src: [
					'*.css',
					'*.php',
					'*.txt',
					'screenshot.png',
					'assets/**',
					'inc/**',
					'templates/**'
				],
				dest: 'build/'
			}
		},

		cssjanus: {
			options: {
				swapLtrRtlInUrl: false
			},
			assets: {
				expand: true,
				cwd: 'assets/css/',
				src: [ '**/*.css', '!**/*rtl.css', '!**/*min.css' ],
				dest: 'assets/css/',
				ext: '-rtl.css'
			},
			editor: {
				files: {
					'editor-style-rtl.css': 'editor-style.css'
				}
			},
			main: {
				files: {
					'style-rtl.css': 'style.css'
				}
			}
		},

		cssmin: {
			options: {
				processImport: false,
				roundingPrecision: 5,
				shorthandCompacting: false
			},
			assets: {
				expand: true,
				cwd: 'assets/css/',
				src: [ '**/*.css', '!**/*.min.css' ],
				dest: 'assets/css/',
				ext: '.min.css'
			}
		},

		devUpdate: {
			packages: {
				options: {
					updateType: 'force'
				}
			}
		},

		imagemin: {
			options: {
				optimizationLevel: 3
			},
			assets: {
				expand: true,
				cwd: 'assets/images/',
				src: [ '**/*.{gif,jpeg,jpg,png,svg}' ],
				dest: 'assets/images/'
			},
			screenshot: {
				files: {
					'screenshot.png': 'screenshot.png'
				}
			}
		},

		jshint: {
			assets: [ 'assets/js/**/*.js', '!assets/js/**/*.min.js' ],
			gruntfile: [ 'Gruntfile.js' ]
		},

		replace: {
			charset: {
				overwrite: true,
				replacements: [
					{
						from: /^@charset "UTF-8";\n/,
						to: ''
					}
				],
				src: [ 'style*.css' ]
			},
			php: {
				overwrite: true,
				replacements: [
					{
						from: /@since(\s+)NEXT/g,
						to: '@since$1<%= pkg.version %>'
					},
					{
						from: /'PRIMER_CHILD_VERSION',(\s*)'[\w.+-]+'/,
						to: "'PRIMER_CHILD_VERSION',$1'<%= pkg.version %>'"
					}
				],
				src: [ '*.php', 'inc/**/*.php', 'templates/**/*.php' ]
			},
			readme: {
				overwrite: true,
				replacements: [
					{
						from: /Stable tag:(\s*)[\w.+-]+/,
						to: 'Stable tag:$1<%= pkg.version %>'
					}
				],
				src: [ 'readme.txt' ]
			},
			sass: {
				overwrite: true,
				replacements: [
					{
						from: /Version:(\s*)[\w.+-]+/,
						to: 'Version:$1<%= pkg.version %>'
					}
				],
				src: [ '.dev/sass/**/*.scss' ]
			}
		},

		sass: {
			options: {
				precision: 5,
				sourceMap: false
			},
			assets: {
				expand: true,
				cwd: '.dev/sass/assets/',
				src: [ '**/*.scss' ],
				dest: 'assets/css/'
			},
			editor: {
				files: {
					'editor-style.css': '.dev/sass/editor-style.scss'
				}
			},
			main: {
				files: {
					'style.css': '.dev/sass/style.scss'
				}
			}
		},

		uglify: {
			options: {
				ASCIIOnly: true
			},
			assets: {
				expand: true,
				cwd: 'assets/js/',
				src: [ '**/*.js', '!**/*.min.js' ],
				dest: 'assets/js/',
				ext: '.min.js'
			}
		},

		watch: {
			images: {
				files: 'assets/images/**/*.{gif,jpeg,jpg,png,svg}',
				tasks: [ 'imagemin' ]
			},
			js: {
				files: 'assets/js/**/*.js',
				tasks: [ 'jshint', 'uglify' ]
			},
			sass: {
				files: '.dev/sass/**/*.scss',
				tasks: [ 'sass', 'autoprefixer', 'cssjanus', 'cssmin' ]
			}
		},

		wp_readme_to_markdown: {
			options: {
				post_convert: function( readme ) {
					var matches = readme.match( /\*\*Tags:\*\*(.*)\r?\n/ ),
					    tags    = matches[1].trim().split( ', ' ),
					    section = matches[0];

					for ( var i = 0; i < tags.length; i++ ) {
						section = section.replace( tags[i], '[' + tags[i] + '](https://wordpress.org/themes/tags/' + tags[i] + '/)' );
					}

					// Tag links
					readme = readme.replace( matches[0], section );

					// Badges
					readme = readme.replace( '## Description ##', grunt.template.process( pkg.badges.join( ' ' ) ) + "  \r\n\r\n## Description ##" );

					// YouTube
					readme = readme.replace( /\[youtube\s+(?:https?:\/\/www\.youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)(.+?)\]/g, '[![Play video on YouTube](https://img.youtube.com/vi/$1/maxresdefault.jpg)](https://www.youtube.com/watch?v=$1)' );

					return readme;
				}
			},
			main: {
				files: {
					'readme.md': 'readme.txt'
				}
			}
		}

	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( 'default', [ 'sass', 'replace:charset', 'autoprefixer', 'cssjanus', 'cssmin', 'jshint', 'uglify', 'imagemin' ] );
	grunt.registerTask( 'build',   [ 'default', 'clean:build', 'copy:build' ] );
	grunt.registerTask( 'check',   [ 'devUpdate' ] );
	grunt.registerTask( 'readme',  [ 'wp_readme_to_markdown' ] );
	grunt.registerTask( 'version', [ 'replace', 'readme', 'build' ] );

};
