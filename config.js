module.exports = {
	owner: '', // owner id
	version: '', // bot project version
	color: '', // bot and embed color
	prefix: [], // bot prefix
	logo: '', // bot logo
	setup: { // setup for general command
		invite: {
			server: '',
			bot: ''
		},
		donate: {
			/**
             * donate_name: link
             */
		},
		vote: [
			/**
             * [vote_sitemap, link]
             */
		],
		version: {
			nodejs: '',
			discordjs: ''
		}
	},
	api: { // api to fetch for bot
        /**
         * api_name: {
         *  endpoint: link
         * }
         */
    }
}