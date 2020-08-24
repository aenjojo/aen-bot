const { Command } = require('../../index');
const { oneLine } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['r'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Reloads a command',
				arguments: ['<command>'],
				explains: ['The command name to be reloaded'],
				example: 'ping'
			}
		});
	}
	
	async run(msg, args) {
		let [cmd] = args, cmdName;
		
		if (!cmd) return msg.channel.send(`No command entered. Please specify a command to be reloaded.`);
		
		try {
			let cmdData = await this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd));
			cmdName = cmdData;
		} catch (e) {
			console.log(e);
			return msg.channel.send(`Error: Command ${cmd} is not exist`);
		}
		
		try {
			let dir = cmdName.path;
			
			await this.client.command.splice(this.client.command.findIndex(c => Object.is(c, cmdName)), 1);
			delete require.cache[require.resolve(`${this.client.basedir}${dir}`)];
		
			await this.client.load(dir, this.client.basedir);
		
			return msg.channel.send(oneLine`
				Reloaded \`${cmdName.name}\` command
				${cmdName.aliases.length > 0 ? `with \`${cmdName.aliases}\` as aliases.`: ''}
			`)
		} catch (e) {
			console.log(`Error: Command ${cmd} can't be reloaded`)
		}
	}
}