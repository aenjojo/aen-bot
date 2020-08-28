Object.mergeDefault = require('discord.js').Util.mergeDefault;

/**
 * @constructor
 * @param {client} client - To set the command to Discord client 
 * @param {object} options - Command's options
 */

class Command {
	constructor(client, options = {}) {
		let opts = Object.mergeDefault(DefSetting, options);
		
		this.client = client;
	
		this.name = opts.name;
		this.aliases = opts.aliases;
		this.group = opts.group;
		this.path = opts.path;
		this.owner = opts.ownerOnly;
		this.guild = opts.guildOnly;
		//this.donor = opts.donorOnly;
		this.nsfw = opts.nsfw;
		this.Cperms = opts.clientPerms;
		this.Uperms = opts.userPerms;
		this.help = opts.help;
		this.cooldown = opts.cooldown;
	}
}

const DefSetting = {
	name: null,
	aliases: new Array(),
	group: 'misc',
	path: null,
	ownerOnly: false,
	guildOnly: false,
	donorOnly: false,
	nsfw: false,
	clientPerms: new Array(),
	userPerms: new Array(),
	help: {
		description: 'No description available',
		arguments: new Array(),
		explains: new Array(),
		example: ''
	},
	cooldown: {
		users: new Map(),
		usage: 0,
		time: 0
	}
}

module.exports = Command;