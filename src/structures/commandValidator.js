const { stripIndents } = require('common-tags');

class CommandValidator {
	constructor(client, message) {
		this.client = client;
		this.msg = message;
	}
	
	validateCommand(type = {}) {
		let authorID = this.msg.author.id;
		let channel = this.msg.channel;
		let guild = this.msg.guild;
		let dm = this.msg.channel.type == 'dm' ? true : false;

		let valOwner = this.val_owner(type.owner, authorID, this.client.conf.owner);
		let valGuild = this.val_guild(type.guild, channel);
		let valNSFW = this.val_nsfw(type.nsfw, channel);
		let valUPerms = dm || this.val_uPerms(type.uPerms, channel, guild, authorID);
		let valCPerms = dm || this.val_cPerms(type.cPerms, channel, guild, this.client.user.id);
		let valCD = this.val_cd(type.cooldown, channel, this.msg.createdTimestamp, authorID);

		if (valOwner === true
			&& valGuild === true
			&& valNSFW === true
			&& valUPerms === true
			&& valCPerms === true
			&& valCD === true) return true;
		else return false;
	}
	
	val_owner(owner, authorID, ownerID) {
		if (owner === true && authorID !== ownerID) return false;
		return true;
	}
	
	val_guild(guild, channel) {
		if (guild === true && channel.type === 'dm') {
			channel.send('You can use this command in guild channel only.');
			return false;
		}
		return true;
	}
	
	/*
	val_donor() {
		user = get.db(author)
		user is donor? true : false
	}
	*/

	val_nsfw(nsfw, channel) {
		if (nsfw === true && channel.nsfw === undefined) {
			channel.send('You can use this command in nsfw channel only.');
			return false;  
		}
		return true;
	}
	
	val_uPerms(perms, channel, guild, authorID) {
		if (perms.length !== 0 && !guild.member(authorID).hasPermission(perms)) {
			let permsList = perms.join('`, `').replace(/\_/g, ' ').toLowerCase();
	
			channel.send(`You didn't have the followed permission to use this command: \`${permsList}\``);
			return false;
		}
		return true;
	}
	
	val_cPerms(perms, channel, guild, userID) {
		if (perms.length !== 0 && !guild.member(userID).hasPermission(perms)) {
			let permsList = perms.join('`, `').replace(/\_/g, ' ').toLowerCase();
			
			channel.send(stripIndents`
				I need the followed permissions to use this command: \`${permsList}\`
				Make sure you enable those permissions first.
			`);
			return false;
		}
		return true;
	}
	
	val_cd(cooldown, channel, timestamp, authorID) {
		if (cooldown.users.has(authorID)) {
			let usage = cooldown.users.get(authorID)[0];
			let lastTS = cooldown.users.get(authorID)[1];
			let newUsage, newTS;
			
			if (usage <= 0) {
				let TS = timestamp - (lastTS + cooldown.time);
				let time_left = TS < 0 ? `You must wait ${(-(TS/1000)).toFixed(2)}s before using this command again.`: true;
				
				if (time_left !== true) {
					channel.send(time_left);
					return false;
				}
				
				newUsage = cooldown.usage - 1;
				newTS = lastTS;
			}
			else if (usage === 1) {
				newUsage = --usage;
				newTS = timestamp;
			}
			else {
				newUsage = --usage;
				newTS = lastTS;
			}
			
			cooldown.users.set(authorID, [newUsage, newTS]);
			return true;
		}
		
		if (!cooldown.users.has(authorID) && cooldown.usage !== 0) {
			let newUsage = cooldown.usage - 1;
			let newTS = timestamp;
			
			cooldown.users.set(authorID, [newUsage, newTS]);
			return true;
		}

		return true;
	}
}

module.exports = CommandValidator;