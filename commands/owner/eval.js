const { Command } = require('../../index');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			aliases: ['ev', 'exec'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Evaluates JavaScript code',
				arguments: ['<code>'],
				explains: ['Code to be executed/evaluated'],
				example: '2+2'
			}
		});
	}
	
	async run(msg, args) {
		let evaled, result,
				code = args.join(' '),
				hrBegin = process.hrtime(),
				client = this.client;
	
		try {
			evaled = eval(code);
		
			console.log(evaled);
			result = 'success';
		} catch (e) {
			console.log(e);
			result = e;
		}
	
		let hrEnd = process.hrtime(hrBegin);
		let res = this.result(msg, evaled, hrEnd, result);
	
		msg.channel.send(res);
	}

	result(msg, res, time, result) {
		if (result == 'success') {
			msg.react('✅');
		
			return new MessageEmbed()
				.setTitle(`Eval Output`)
				.setColor('#00ee00')
				.setDescription(res)
				.addField('Type:', typeof res)
				.setFooter(`Executed in ${time}ms`);
		} else {
			msg.react('❎');
		
			return new MessageEmbed()
				.setTitle(`Error Output`)
				.setColor('#ee0000')
				.setDescription(result)
				.setFooter(`Executed in ${time}ms`);
		}
	} 
}