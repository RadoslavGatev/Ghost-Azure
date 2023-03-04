
	var   parsed = null
		, parse;

	parse = function(){
		var argv;

		parsed = {};

		argv = Array.prototype.slice.call(process.argv, 2).join(' ').split('--').filter(function(item) { 
			return item.length > 0; 
		}).forEach(function(item) {
			var reg = /([^ =]+)(?: |=)(.+)/gi.exec(item.trim());

			if (reg) parsed[reg[1].trim()] = reg[2];
			else parsed[item.trim()] = null;
		}.bind(this));
	};



	module.exports = {
		get: function(key) {
			if (!parsed) parse();
			return parsed[key];
		}

		, has: function(key) {
			if (!parsed) parse();
			return parsed.hasOwnProperty(key);
		}
	};