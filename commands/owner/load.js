const { Command } = require('../../index');
const { oneLine } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'load',
			aliases: ['l'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Loads a command',
				arguments: ['<group>', '<command>'],
				explains: [
					'The name of command group, where the command to be loaded belongs',
					'The command name to be loaded'
				],
				example: 'general ping'
			}
		});
	}
	
	async run(msg, args) {
		let [grp, cmd] = args;
		
		if (!grp || !cmd) return msg.channel.send(`No group/command entered. Please spaecify a group/command to be reloaded.`);
		
		let cmdData = this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd));
		
		if (cmdData) {
			return msg.channel.send(`Error: Command ${cmd} is already registered`);
		}
			
		try {
			let dir = `/commands/${grp}/${cmd}.js`;
	
			await this.client.load(dir, this.client.basedir);
			
			let cmdName = this.client.command.find(c => c.name == cmd)
		
			return msg.channel.send(oneLine`
				Loaded \`${cmdName.name}\` command
				${cmdName.aliases.length > 0 ? `with \`${cmdName.aliases}\` as aliases.`: ''}
			`)
		} catch (e) {
			console.log(`Error: Command ${cmd} can't be loaded\n${e}`)
		}
	}
}