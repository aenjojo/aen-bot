class Time {
	constructor(date) {
		this.time = new Date(date);
		this.year = this.time.getFullYear();
		this.month = this.time.getMonth();
		this.date = this.time.getDate();
		this.hour = this.time.getHours();
		this.minute = this.time.getMinutes();
		this.second = this.time.getSeconds();
	}
	
	/* TIMES MODIFICATION */
	Year(type = '') {
		if (type == 'date')
			return String(this.year).slice(2);
		
		return this.year;
	}
	Month(type = '') {
		let MM;
		
		if (type == 'date')
			return (this.month+1) < 10 ? `0${(this.month+1)}` : (this.month+1);
		
		switch(this.month) {
			case 0:  MM = 'January';   break;
			case 1:  MM = 'February';  break;
			case 2:  MM = 'March';     break;
			case 3:  MM = 'April';     break;
			case 4:  MM = 'May';       break;
			case 5:  MM = 'June';      break;
			case 6:  MM = 'July';      break;
			case 7:  MM = 'August';    break;
			case 8:  MM = 'September'; break;
			case 9:  MM = 'October';   break;
			case 10: MM = 'November';  break;
			case 11: MM = 'December';  break;
		}
		
		return MM;
	}
	Date(type = '') {
		if (type == 'date')
			return this.date < 10 ? `0${this.date}` : this.date;
		
		return this.date;
	}
	Hour(type) {
		return this.hour < 10 ? `0${this.hour}` : this.hour;
	}
	Minute() {
		return this.minute < 10 ? `0${this.minute}` : this.minute;
	}
	Second() {
		return this.second < 10 ? `0${this.second}` : this.second;
	}
	
	/* TIMES FORMATION */
	NormalDate() {
		return `${this.Date()} ${this.Month()} ${this.Year()}`;
	}
	NormalTime() {
		return `${this.Hour()}:${this.Minute()}:${this.Second()}`;
	}
	FormattedDate(FY = true) {
		if (FY == false) // Check if Full Year is turned off
			return `${this.Date('date')}/${this.Month('date')}/${this.Year('date')}`;
		
		return `${this.Date('date')}/${this.Month('date')}/${this.Year()}`;
	}
}

module.exports = Time;