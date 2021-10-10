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

	registerCommand(root, group, file, list = []) {
		let dir = `/commands/${group}/${file}`;
		let filename = file.split('.')[0];

		list.push(filename);
		this.client.load(dir, root);

		return list;
	}

	async registerCommands(group = []) {
		for (let x of group) {
			let files = await readdir(`./commands/${x}/`);
			let cmdList = new Array();
		
			files.forEach(file => {
				this.registerCommand(this.client.basedir, x, file, cmdList);
			});

			this.client.group.push([x, cmdList]);
		}

		return this;
	}

	registerDefault() {
		this.registerEvent('..', 'ready');
		this.registerEvent('..', 'message');

		this.registerCommand('..', 'general', 'ping');
		this.registerCommand('..', 'general', 'help');
		this.registerCommand('..', 'owner', 'eval');
		this.registerCommand('..', 'owner', 'load');
		this.registerCommand('..', 'owner', 'reboot');
		this.registerCommand('..', 'owner', 'reload');
		this.registerCommand('..', 'owner', 'unload');

		this.client.group.push(['general', ['help', 'ping']]);

		return this;
	}
}

module.exports = Registry;