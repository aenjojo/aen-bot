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

	registerEvent(basedir, evtdir, file) {
		let evtFunc = new (require(path.join(basedir, evtdir, file)))(this.client);
		let	evtName = file.split('.')[0];
			
		this.client.on(evtName, (...args) => {
			evtFunc.run(...args);
		});
	}

	async registerEvents(evtdir) {
		let files = await readdir('./'+evtdir);
		
		files.forEach(file => {
			this.registerEvent(this.client.basedir, evtdir, file);
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

	async registerCommands(cmddir, group) {
		for (let x of group) {
			let dir = path.join(cmddir, x);
			let files = await readdir('./'+dir);
			let cmdList = new Array();
		
			files.forEach(file => {
				this.registerCommand(this.client.basedir, dir, file, cmdList);
			});

			this.client.group.push([x, cmdList]);
		}

		return this;
	}

	register({ eventDirectory, commandDirectory, commandGroup }) {
		this.registerEvents(eventDirectory);
		this.registerCommands(commandDirectory, commandGroup);

		return this;
	}
}

module.exports = Registry;