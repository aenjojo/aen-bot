const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

class AenBot extends Discord.Client {
	constructor(options = {}) {
		super(options);
		
		this.prefix = options.prefix;
		this.conf = options.config;
		this.basedir = options.basedir;
		
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
	
	async registerEvents() {
		let files = await readdir(`./events/`);
		
		files.forEach(file => {
			let evtFunc = new (require(`${this.basedir}/events/${file}`))(this);
			let	evtName = file.split('.')[0];
			
			this.on(evtName, (...args) => {
				evtFunc.run(...args);
			});
		});
	}
	
	async registerDefaultEvents() {
		for (let file of ['ready', 'message']) {
			let evtFunc = new (require(`../events/${file}`))(this);
			
			this.on(file, (...args) => {
				evtFunc.run(...args);
			});
		}
	}

	async registerCommands(group = []) {
		for (let x of group) {
			let files = await readdir(`./commands/${x}/`);
			let cmdList = new Array();
		
			files.forEach(file => {
				let dir = `/commands/${x}/${file}`;
				let filename = file.split('.')[0];

				cmdList.push(filename);
				this.load(dir, this.basedir);
			});

			this.group.push([x, cmdList]);
		}
	}

	registerDefaultCommands() {
		let cmdhelp = this.load('../commands/general/help.js');
		let cmdping = this.load('../commands/general/ping.js');
		let cmdeval = this.load('../commands/owner/eval.js');
		let cmdload = this.load('../commands/owner/load.js');
		let cmdreboot = this.load('../commands/owner/reboot.js');
		let cmdreload = this.load('../commands/owner/reload.js');
		let cmdunload = this.load('../commands/owner/unload.js');

		this.group.push(['general', ['help', 'ping']]);
	}
}

module.exports = AenBot;