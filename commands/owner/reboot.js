const { Command } = require('../../index');
const { oneLine } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'reboot',
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Reboot the bot'
			}
		});
	}
	
	async run(msg, args) {
		let m = await msg.channel.send("Rebooting...");
		
		await this.client.destroy();
		await this.client.login(process.env.TOKEN);
		
		return m.edit(`Rebooted in ${m.createdTimestamp - msg.createdTimestamp}ms.`)
	}
}