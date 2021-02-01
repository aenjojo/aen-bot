

class Paginator {
	constructor(client, msg, data, cmdCallback) {
		this.client = client;
		this.msg = msg;
		this.data = data;
		this.cmd = cmdCallback;

		return this;
	}

	async collectReaction(...args) {
		const timer = 120000;
		const reactionsdb = {
			prev: "⏮️",
			bkwd: "◀️",
			stop: "⏹️",
			frwd: "▶️",
			next: "⏭️",
		};
		let array = this.data;
		let curr = 0;
    	let max = array.length;

		let m = await this.msg.channel.send(this.cmd(array, curr, max, ...args));

		await m.react(reactionsdb.prev);
		await m.react(reactionsdb.bkwd);
		await m.react(reactionsdb.stop);
		await m.react(reactionsdb.frwd);
		await m.react(reactionsdb.next);

		const filter = (reaction, user) => Object.values(reactionsdb)
			.includes(reaction.emoji.name) && user.id == this.msg.author.id;
	
		const collector = m.createReactionCollector(filter, {time: timer});

		collector.on("collect", async (reaction) => {
			switch (reaction.emoji.name) {
				case reactionsdb.prev: curr  = 0;		 break;
				case reactionsdb.bkwd: curr -= 1;		 break;
				case reactionsdb.stop: collector.stop(); break;
				case reactionsdb.frwd: curr += 1;		 break;
				case reactionsdb.next: curr  = max-1;	 break;
			}
		
			reaction.users.remove(this.msg.author.id);
		
			if (curr < 0) curr = 0;
			if (curr > max) curr = max;
		
			await m.edit(this.cmd(array, curr, max, ...args));
		});

		collector.on("end", async () => {
			await m.reactions.removeAll();
		});
	}
}

module.exports = Paginator;