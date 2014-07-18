var gui = require("nw.gui");
var win = gui.Window.get();
var fs = require('fs');
var path = require("path");

var configFolderPath = path.join(process.execPath, "../config/");
var configPath = path.join(process.execPath, "../config/config");

win.on('loaded', function(){
	//console.log('Window is loaded!');
	if ( !fs.existsSync( configFolderPath ) ) {
		fs.mkdirSync(configFolderPath);
		console.log("path: " + configFolderPath);
	} else {
		var configObj = load(configPath);
		if (configObj) {
			var objWindow = configObj.window;
			win.moveTo(objWindow.x, objWindow.y);
			win.resizeTo(objWindow.width, objWindow.height);
		}
	}
});

win.on('close', function() {
	console.log("Current X: " + win.x);
	console.log("Current Y: " + win.y);
	console.log("Current Width: " + win.width);
	console.log("Current Height: " + win.height);
	// save the current config to file
	var configObj = {
		window: {
			x: win.x,
			y: win.y,
			width: win.width,
			height: win.height
		}
	};
	save(configObj, configPath);
	this.close(true);
});

/**
 * Saves an JSON object to a file
 * @param obj JSON object
 * @param filePath the path of the file
 */
function save(obj, filePath) {
	var plainContent = angular.toJson(obj);
	fs.writeFileSync( filePath, plainContent );
}

/**
 * Loads an JSON object from a file
 * @param filePath the path of the file
 * @returns an JSON object. If error occurs(file not exist or parsing error), returns false
 */
function load(filePath) {
	try {
		return angular.fromJson( fs.readFileSync(filePath, "utf8") );
	} catch(e) {
		return false;
	}
}