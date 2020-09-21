const { stripIndents } = require('common-tags');

/**
 * @constructor
 */

class GetUser {
	constructor(client, msg, user, cmdCallback) {
		this.client = client;
		this.cache = this.client.users.cache;
		this.msg = msg;
		this.user = `${user}`;
		this.cmd = cmdCallback;

		return this;
	}

	getByID() {
		let result = this.cache.get(this.user);
		
		if (typeof result === 'undefined') {
			return this.msg.channel.send('No user is found with that id.');
		}

		return this.cmd(this.msg, result);
	}

	getByUsername() {
		let result = this.cache.filter(user => user.username.toLowerCase().startsWith(this.user.toLowerCase()));

		if (result.size === 1) {
			result = result.first();

			return this.cmd(this.msg, result);
		}

		result = result.first(10);
		
		let msg = this.msg.channel.send(stripIndents`
			There are ${result.length} users found:
			\`\`\`
				${result.map((data, index) => `[${index}] ${data.id} : ${data.username}`).join('\n')}
			\`\`\`
			Type the coresponding number next to the user to choose. Type \`ABORT\` to cancel.
		`);

		// expression if 0 to 9 or abort [1]
		const regex = new RegExp(`[0-${result.length-1}]|abort`, 'ig');
		const filter = m => m.author.id === this.msg.author.id;
		const collector = this.msg.channel.createMessageCollector(filter, {time: 10000});

		let choice;

		collector.on('collect', m => {
			// check if message collected match with the expression [1]
			let match = m.content.match(regex);

			// if match, then stop
			// else, just run till collector timed out
			if (match) {
				return collector.stop();
			}
		});
		collector.on('end', c => {
			// c.last() takes the last data collected from collector
			// {content: ''} to prevent error if no message collected
			let lastData = c.last() || {content: ''};

			// check if the last collected message have content of number between 0 - 9
			if (lastData.content.match(/[0-9]/g)) {
				choice = result[Number(lastData.content)];

				return this.cmd(this.msg, choice);
			}
			// return cancel if no match / no message collected
			else {
				return this.msg.channel.send('Command cancelled.');
			}
		});
	}

	getByNickname() {

	}

	getByTagName() {

	}

	async validate() {
		// check if id
		if(this.user.match(/^\d{18}$/g)) {
			return this.getByID();
		}
		/* check if mention
		else if (this.user.match(/^<@\d{18}>$/g)) {

		}
		// check if tag
		else if (this.user.match(/^[\w\W]+#\d{4}$/g)) {

		}
		// check if nickname
		else if (this.user.match()) {

		}*/
		// check if username
		else if (this.user.match(/^[\w\W]+[^#\d{4}]/g)) {
			return this.getByUsername();
		}
		// else
		return false;
	}
}

module.exports = GetUser;