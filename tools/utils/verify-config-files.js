'use strict';

var fs = require('fs'),
	fse = require('fs-extra'),
	path = require('path');

var REL_BOILERPLATE_DIR = '../boilerplate',
	REL_PROJECT_DIR = '../../';

var ABS_BOILERPLATE_DIR = 'tools/boilerplate',
	ABS_PROJECT_DIR = './';

function verifyConfigFile(fileName) {

	var relFilePath = path.join(REL_PROJECT_DIR, fileName),
		relBoilerplatePath = path.join(REL_BOILERPLATE_DIR, fileName);

	var absFilePath = path.join(ABS_PROJECT_DIR, fileName),
		absBoilerplatePath = path.join(ABS_BOILERPLATE_DIR, fileName);

	if (!fs.existsSync(absFilePath)) {
		console.log('File `' + fileName + '` does not exist. Copying from boilerplate.\n');
		fse.copySync(absBoilerplatePath, absFilePath);
	} else {
		console.log('File `' + fileName + '` exists as desired. Proceeding.');
	}
}

function verifyConfigFiles(fileNameList) {
	console.log('Verifying existince of config files.');
	fileNameList.forEach(verifyConfigFile);
	console.log('\n\n');
}

module.exports = verifyConfigFiles;