const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const path = require('path');

/**
 * @constructor
 * @param {client} client - The client to be registered with events and commands
 */

class Registry {
	constructor(client) {
		this.client = client;

		return this;
	}

	registerEvent(dir, file) {
		let evtFunc = new (require(`${dir}/events/${file}`))(this.client);
		let	evtName = file.split('.')[0];
			
		this.client.on(evtName, (...args) => {
			evtFunc.run(...args);
		});
	}

	async registerEvents() {
		let files = await readdir(`./events/`);
		
		files.forEach(file => {
			this.registerEvent(this.client.basedir, file);
		});

		return this;
	}

	registerCommand(root, groupdir, file, list = []) {
		let dir = path.join(groupdir, file);
		let filename = file.split('.')[0];
		
		let cmd = new (require(path.join(root, dir)))(this.client);
		cmd.path = dir;
		
		if (!cmd) return `Directory: ${dir} not exist`;
		
		list.push(filename);
		this.client.command.push(cmd);
	}

	async registerCommands(cmddir, group = []) {
		for (let x of group) {
			let dir = path.join(cmddir, x);
			let files = await readdir('.'+dir);
			let cmdList = new Array();
		
			files.forEach(file => {
				this.registerCommand(this.client.basedir, dir, file, cmdList);
			});

			this.client.group.push([x, cmdList]);
		}

		return this;
	}

	registerDefault() {
		let root = '..';

		this.registerEvent(root, 'ready');
		this.registerEvent(root, 'message');

		this.registerCommand(root, '/commands/general', 'ping.js');
		this.registerCommand(root, '/commands/general', 'help.js');
		this.registerCommand(root, '/commands/owner', 'load.js');
		this.registerCommand(root, '/commands/owner', 'eval.js');
		this.registerCommand(root, '/commands/owner', 'reboot.js');
		this.registerCommand(root, '/commands/owner', 'reload.js');
		this.registerCommand(root, '/commands/owner', 'unload.js');

		this.client.group.push(['general', ['help', 'ping']]);

		return this;
	}
}

module.exports = Registry;