const { Command } = require('../../index');
const { oneLine } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'unload',
			aliases: ['u'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Unloads a command',
				arguments: ['<command>'],
				explains: ['The command name to be unloaded'],
				example: 'ping'
			}
		});
	}
	
	async run(msg, args) {
		let [cmd] = args, cmdName;
		
		if (!cmd) return msg.channel.send(`No command entered. Please specify a command to be unloaded.`);
		
		try {
			cmdName = this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd));
		} catch (e) {
			return msg.channel.send(`Command ${cmd} not exist`);
		}
		
		try {
			let dir = cmdName.path;
		
			await this.client.command.splice(this.client.command.findIndex(c => Object.is(c, cmdName)), 1);
			delete require.cache[require.resolve(`${this.client.basedir}${dir}`)];
		
			return msg.channel.send(oneLine`
				Unloaded \`${cmdName.name}\` command
				${cmdName.aliases.length > 0 ? `with \`${cmdName.aliases}\` as aliases.`: ''}
			`)
		} catch (e) {
			console.log(`Error: Command ${cmd} can't be loaded`)
		}
	}
}