class Capitalize {
	constructor(text) {
		this.text = text;
	}

	get onlyFirstLetter() {
		let firstLetter = this.text.slice(0,1).toUpperCase();
		let restLetter = this.text.slice(1);

		return `${firstLetter}${restLetter}`;
	}
}

module.exports = Capitalize;