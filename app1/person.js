class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	greeting() {
		console.log("This is " + this.name + " and i am " + this.age);
	}
}

module.exports = Person;