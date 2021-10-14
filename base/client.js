const { Client } = require('discord.js');
const Registry = require('./registry');

/**
 * @constructor
 * @param {object} options - Options for Discord Client
 */

class AenBot extends Client {
	constructor(options) {
		super(options);
		
		this.prefix = options.prefix;
		this.conf = options.config;
		this.basedir = options.basedir;
		
		this.registry = new Registry(this);
		this.command = new Array();
		this.group = new Array();
		
		return this;
	}
	
	load(dir, base = "") {
		let cmd = new (require(`${base}${dir}`))(this);
		cmd.path = dir;
		
		if (!cmd) return `Directory: ${dir} not exist`;
		
		this.command.push(cmd);
	}
}

module.exports = AenBot;