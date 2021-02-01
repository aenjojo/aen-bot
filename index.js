module.exports = {
	// base
	AenBot: require('./base/client'),
	Command: require('./base/command'),

	// src/structure (required)
	CommandValidator: require('./src/structures/commandValidator'),
	GetUser: require('./src/structures/getUser'),
	Paginator: require('./src/structures/paginator'),

	// src/libs (additional)
	Capitalize: require('./src/libs/capitalize'),
	Time: require('./src/libs/time'),

	// src/databases
	// Firebase:
	// MongoDB:
	// MySQL:
}