class Coffee {
	#roast: string;
	#ounces: number;
	#shot: number;	

	constructor(roast?: string, ounces = 8, shot? : number) { 
		if(roast === undefined) {
			throw Error('No roast defined');
		}

		this.#roast = roast;
		this.#ounces = ounces;
		this.#shot= (shot===undefined)? 0 : shot;

	}

	//getSize = () => {
		//switch(this.#ounces) {
			//case 8:
				//return 'Small';
			//case 12:
				//return 'Medium';
			//case 16:
				//return 'Large';
			//default:
				//return 'undefined';
		//}
	//}

	getSize = () => {
		if (this.#ounces <= 8) {
			return 'Small';
		} else if (this.#ounces <= 12) {
			return 'Medium';
		} else {
			return 'Large';
		}
	}

	order = () => {
		let msg;	
		msg = `You've ordered a ${this.getSize()} ${this.#roast} coffee.`;
		return msg;
	}
}

export default Coffee;