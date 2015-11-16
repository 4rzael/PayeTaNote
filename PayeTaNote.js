'use strict';

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var readline = require('readline');

var NOTE_FOLDER = './piano/';
var NOTE_FILETYPE = 'wav';

function getNote (screenPercentage) {
	return "gabcdef"[Math.floor(screenPercentage * 7)];
}

var pyCam = spawn('python cam.py');

var rl = readline.createInterface({
  input: pyCam.stdout
});

rl.on('line', function (line) {
	var nb = parseInt(line, 10);

	if (!Number.isNaN(nb)) {
		exec('sox ' + NOTE_FOLDER + getNote(nb) + '.' + NOTE_FILETYPE);
	}
});

exec('sox piano/a.wav -d');
