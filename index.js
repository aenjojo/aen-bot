module.exports = {
	// base
	AenBot: require('./base/client'),
	Command: require('./base/command'),

	// src/structure (required)
	CommandValider: require('./src/structures/commandValider'),
	// CheckUser: require('./src/structures/checkUser),

	// src/libs (additional)
	Capitalize: require('./src/libs/capitalize'),
	Time: require('./src/libs/time'),

	// src/databases
	// Firebase:
	// MongoDB:
	// MySQL:
}