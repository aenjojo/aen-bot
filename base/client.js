const { Client } = require('discord.js');
const Registry = require('./registry');

/**
 * @constructor
 * @param {object} options - Options for Discord Client
 */

class AenBot extends Client {
	constructor(options = {}) {
		super(options);
		
		this.prefix = options.prefix;
		this.conf = options.config;
		this.basedir = options.basedir;
		
		this.command = new Array();
		this.group = new Array();
		this.registry = new Registry(this);
		
		return this;
	}
}

module.exports = AenBot;