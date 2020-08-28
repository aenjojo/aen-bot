class CheckUser {
	constructor() {
		/**
		 * get the id
		 * return this
		 */

		this.client = client;
		this.id = id;
	}

	inCurrentGuild() {
		/**
		 * check the user by id in the current guild
		 * return data if true
		 */
		let userID, getID = this.id.match(/\d{18}/);

		if (getID) {
			userID = this.id.replace(/\<\@|\>/g, '');
		}

		let userData = this.client.users.get(userID);
		let memberData = msg.guild.members.get(userID);

		return {
			userData,
			memberData
		};
	}

	inAllGuild() {
		/**
		 * check the id in all guild the bot had joined
		 * return data if true
		 */
	}

	inDiscord() {
		/**
		 * check the id in the entire discord
		 * return data if true
		 */
	}

	run() {
		/**
		 * check in the current guild
		 *  if exist, use the data
		 *  if not exist, check in all guild
		 *   if exist, use the data
		 * 	 if not exist, check in the entire discord(?) or return false
		 * 	  if exist, use the data
		 * 	  if not exist, return false
		 */
	}
}

module.exports = CheckUser;