module.exports = {
	// base
	AenBot: require('./base/client'),
	Command: require('./base/command'),

	// src/structure (required)
	Validate: require('./src/structures/validate'),

	// src/libs (additional)
	Capitalize: require('./src/libs/capitalize'),
	Time: require('./src/libs/time'),

	// src/databases
	// Firebase:
	// MongoDB:
	// MySQL:
}