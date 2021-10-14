const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

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

	registerCommand(root, group, file, list = []) {
		let dir = `/commands/${group}/${file}`;
		let filename = file.split('.')[0];

		list.push(filename);
		this.client.load(dir, root);

		return list;
	}

	async registerCommands(cmddir, group) {
		for (let x of group) {
			let dir = path.join(cmddir, x);
			let files = await readdir('./'+dir);
			let cmdList = new Array();
		
			files.forEach(file => {
				this.registerCommand(this.client.basedir, x, file, cmdList);
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