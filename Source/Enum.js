/*
---
name: Enum
description: Enums in JavaScript
requires: []
provides: Enum
...
*/
(function() {
	var Enum, EnumValue;

	// From http://dmitry.baranovskiy.com/post/typeof-and-friends
	var is = function is(o, type) {
		type = String(type).toLowerCase();
		return (type == "null" && o === null) ||
			(type == typeof o) ||
			(type == "object" && o === Object(o)) ||
			(type == "array" && Array.isArray && Array.isArray(o)) ||
			Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type;
	}


	this.Enum = Enum = function(values, properties) {
		var key, name, args, length;
		this.values = [];

		if (is(values, 'array')) {
			for (key = 0, length = values.length; key < length; key++) {
				name = values[key];
				this[name] = new EnumValue(name, key, null, properties);
				this.values.push(this[name]);
			}
		} else if (is(values, 'object')) {
			key = 0;
			for (name in values) if (values.hasOwnProperty(name)) {
				args = values[name];
				this[name] = new EnumValue(name, key, args, properties);
				this.values.push(this[name]);
				key++;
			}
		} else {
			throw new Object({message: 'Invalid values for Enum', values: values});
		}

	};

	Enum.prototype = {
		values: null,
		getValues: function() {
			return this.values;
		},
		toString: function() {
			var keys = [];
			for (x in this.getValues()) {
				keys[keys.length] = x;
			}
			return 'Enum [' + keys.join(', ') + ']';
		}
	};

	EnumValue = function(name, value, args, properties) {
		this.getName = function() { return name; };
		this.getValue = function() { return value };
		this.getArguments = function() { return args };
		this.toString = function() { return name; };

		if (is(properties, 'object')) for (x in properties) if (properties.hasOwnProperty(x)) {
			this[x] = properties[x];
		}

		if (is(args, 'object')) for (x in args) if (args.hasOwnProperty(x)) {
			this[x] = args[x];
		}

		if (properties && properties.initialize) {
			this.initialize.apply(this, args);
		}
	};

})();
