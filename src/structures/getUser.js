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

	async getByUsername() {
		let result = this.cache.filter(user => user.username.toLowerCase().startsWith(this.user.toLowerCase()));

		if (result.size === 1) {
			result = result.first();

			return this.cmd(this.msg, result);
		}
		else if (result.size === 0) {
			return await this.msg.channel.send('No result found');
		}

		result = result.first(10);
		let data = result.map((data, index) => `[${index}] ${data.id} : ${data.username}`).join('\n')
		
		return this.fetchTen(result, data);
	}

	getByNickname() {

	}

	async getByTagName() {
		let result = this.cache.filter(user => user.tag.toLowerCase().startsWith(this.user.toLowerCase()));

		if (result.size === 1) {
			result = result.first();

			return this.cmd(this.msg, result);
		}
		else if (result.size === 0) {
			return await this.msg.channel.send('No result found');
		}

		let data = result.map((data, index) => `[${index}] ${data.id} : ${data.username}`).join('\n')
		
		return this.fetchTen(result, data);
	}

	async validate() {
		// check if id
		if(this.user.match(/^\d{18}$/g)) {
			return this.getByID();
		}
		/* check if mention
		else if (this.user.match(/^<@\d{18}>$/g)) {

		}*/
		// check if tag
		else if (this.user.match(/^[\w\W]+#\d{4}$/g)) {
			return await this.getByTagName();
		}
		/* check if nickname
		else if (this.user.match()) {

		}*/
		// check if username
		else if (this.user.match(/^[\w\W]+[^#\d{4}]/g)) {
			return await this.getByUsername();
		}
		// else
		return false;
	}

	async fetchTen(result, data) {
		let msg = await this.msg.channel.send(stripIndents`
			There are ${result.length} users found:
			\`\`\`${data}\`\`\`
			Type the coresponding number next to the user to choose. Type \`ABORT\` to cancel.
		`);

		// expression if 0 to 9 or abort [1]
		const length = result.length > 0 ? result.length - 1 : result.length;
		const regex = new RegExp(`[0-${length}]|abort`, 'ig');
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
		collector.on('end', async c => {
			// c.last() takes the last data collected from collector
			// {content: ''} to prevent error if no message collected
			let lastData = c.last() || {content: ''};

			// check if the last collected message have content of number between 0 - 9
			if (lastData.content.match(/[0-9]/g)) {
				choice = result[Number(lastData.content)];

				await msg.delete();
				return this.cmd(this.msg, choice);
			}
			// return cancel if no match / no message collected
			else {
				return await msg.edit('Command canceled.');
			}
		});
	}
}

module.exports = GetUser;