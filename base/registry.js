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

<<<<<<< HEAD
	async registerCommands(cmddir, group) {
||||||| 1224fab
	async registerCommands(cmddir, group = []) {
=======
	async registerCommands(group = []) {
>>>>>>> 9a99e549acfa46d9bbc1faa3f551ecbbdf4c65be
		for (let x of group) {
<<<<<<< HEAD
			let dir = path.join(cmddir, x);
			let files = await readdir('./'+dir);
||||||| 1224fab
			let dir = path.join(cmddir, x);
			let files = await readdir('.'+dir);
=======
			let files = await readdir(`./commands/${x}/`);
>>>>>>> 9a99e549acfa46d9bbc1faa3f551ecbbdf4c65be
			let cmdList = new Array();
		
			files.forEach(file => {
				this.registerCommand(this.client.basedir, x, file, cmdList);
			});

			this.client.group.push([x, cmdList]);
		}

		return this;
	}

<<<<<<< HEAD
	register({ eventDirectory, commandDirectory, commandGroup }) {
		this.registerEvents(eventDirectory);
		this.registerCommands(commandDirectory, commandGroup);
||||||| 1224fab
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
=======
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
>>>>>>> 9a99e549acfa46d9bbc1faa3f551ecbbdf4c65be

		return this;
	}
}

module.exports = Registry;