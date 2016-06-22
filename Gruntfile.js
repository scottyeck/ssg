'use strict';

var rfr = require('rfr');

var verifyConfigFiles = rfr('tools/utils/verify-config-files'),
	_ftp, _auth, _dest;

var ENV = 'dev';

verifyConfigFiles(['ftp.json', '.ftppass']);

_ftp = rfr('ftp.json');
_auth = _ftp[ENV].auth;
_dest = _ftp[ENV].dest;

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-ftp-deploy');

	grunt.initConfig({	
		'ftp-deploy': {
			dist: {
				auth: _auth,
				src: 'dist',
				dest: _dest,
				forceVerbose: true
			}
		}
	});

	grunt.registerTask('deploy', [
		'ftp-deploy'
	]);
}